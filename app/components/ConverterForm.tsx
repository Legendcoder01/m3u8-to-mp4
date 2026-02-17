'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, Download, AlertCircle, FileVideo, CheckCircle, ChevronDown, ChevronUp, HelpCircle, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

declare global {
    interface Window {
        FFmpeg?: {
            createFFmpeg: (config: {
                log?: boolean;
                corePath?: string;
                progress?: (event: { ratio: number }) => void;
            }) => {
                load: () => Promise<void>;
                FS: (op: string, ...args: any[]) => any;
                run: (...args: string[]) => Promise<void>;
                isLoaded: () => boolean;
            };
        };
    }
}

function getBaseUrl(inputUrl: string) {
    const parsed = new URL(inputUrl);
    parsed.pathname = parsed.pathname.substring(0, parsed.pathname.lastIndexOf('/') + 1);
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString();
}

function resolveUrl(base: string, maybeRelative: string) {
    return new URL(maybeRelative, base).toString();
}

function parseMediaPlaylistLines(playlistContent: string) {
    return playlistContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'));
}

function findVariantPlaylist(masterPlaylist: string) {
    const lines = masterPlaylist.split('\n').map((line) => line.trim());
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].startsWith('#EXT-X-STREAM-INF')) {
            for (let j = i + 1; j < lines.length; j += 1) {
                if (lines[j] && !lines[j].startsWith('#')) {
                    return lines[j];
                }
            }
        }
    }
    return null;
}

async function loadFfmpegScript() {
    if (window.FFmpeg?.createFFmpeg) return;

    await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Could not load FFmpeg WASM script from CDN.'));
        document.body.appendChild(script);
    });
}

export default function ConverterForm() {
    const t = useTranslations('ConverterForm');
    const [url, setUrl] = useState('');
    const [jobId, setJobId] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'pending' | 'processing' | 'completed' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showGuide, setShowGuide] = useState(false);
    const [localDownloadUrl, setLocalDownloadUrl] = useState<string | null>(null);
    const [downloadName, setDownloadName] = useState('converted.mp4');

    const ffmpegRef = useRef<ReturnType<NonNullable<Window['FFmpeg']>['createFFmpeg']> | null>(null);

    const browserFfmpegSupported = typeof SharedArrayBuffer !== 'undefined';

    const cleanupDownload = () => {
        if (localDownloadUrl) {
            URL.revokeObjectURL(localDownloadUrl);
            setLocalDownloadUrl(null);
        }
    };

    const loadFFmpeg = async () => {
        if (ffmpegRef.current?.isLoaded()) return ffmpegRef.current;

        await loadFfmpegScript();

        if (!window.FFmpeg?.createFFmpeg) {
            throw new Error('FFmpeg WASM was not available in the browser.');
        }

        const ffmpeg = window.FFmpeg.createFFmpeg({
            log: false,
            corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
            progress: ({ ratio }) => {
                const conversionProgress = 40 + Math.round(ratio * 60);
                setProgress(Math.min(100, Math.max(40, conversionProgress)));
            },
        });

        await ffmpeg.load();
        ffmpegRef.current = ffmpeg;
        return ffmpeg;
    };

    const downloadBuffer = async (targetUrl: string) => {
        const res = await fetch(targetUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch segment: ${targetUrl}`);
        }
        return new Uint8Array(await res.arrayBuffer());
    };

    const preparePlaylistForFFmpeg = async (playlistUrl: string, ffmpeg: NonNullable<typeof ffmpegRef.current>) => {
        const masterResponse = await fetch(playlistUrl);
        if (!masterResponse.ok) {
            throw new Error('Failed to fetch playlist. Check CORS or URL validity.');
        }

        const masterText = await masterResponse.text();
        const masterBase = getBaseUrl(playlistUrl);

        const variant = findVariantPlaylist(masterText);
        const mediaPlaylistUrl = variant ? resolveUrl(masterBase, variant) : playlistUrl;

        const mediaResponse = await fetch(mediaPlaylistUrl);
        if (!mediaResponse.ok) {
            throw new Error('Failed to fetch media playlist. CORS restrictions may block this URL.');
        }

        const mediaText = await mediaResponse.text();
        const mediaBase = getBaseUrl(mediaPlaylistUrl);
        const mediaLines = parseMediaPlaylistLines(mediaText);

        if (!mediaLines.length) {
            throw new Error('Playlist has no segments to convert.');
        }

        let rewrittenPlaylist = mediaText;
        const total = mediaLines.length;

        for (let i = 0; i < mediaLines.length; i += 1) {
            const segmentLine = mediaLines[i];
            const segmentUrl = resolveUrl(mediaBase, segmentLine);
            const segmentName = `segment-${String(i + 1).padStart(5, '0')}.ts`;

            const bytes = await downloadBuffer(segmentUrl);
            ffmpeg.FS('writeFile', segmentName, bytes);

            rewrittenPlaylist = rewrittenPlaylist.replace(segmentLine, segmentName);
            setProgress(Math.min(39, Math.round(((i + 1) / total) * 39)));
        }

        ffmpeg.FS('writeFile', 'input.m3u8', new TextEncoder().encode(rewrittenPlaylist));
    };

    const startServerConversion = async () => {
        const res = await fetch('/api/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        if (!res.ok) throw new Error('Failed to start server conversion');
        const data = await res.json();
        setJobId(data.id);
        setStatus('processing');
    };

    const startBrowserConversion = async () => {
        const ffmpeg = await loadFFmpeg();
        setStatus('processing');

        await preparePlaylistForFFmpeg(url, ffmpeg);
        await ffmpeg.run('-i', 'input.m3u8', '-c', 'copy', 'output.mp4');

        const outputData = ffmpeg.FS('readFile', 'output.mp4');
        const mp4Blob = new Blob([outputData.buffer], { type: 'video/mp4' });
        const localUrl = URL.createObjectURL(mp4Blob);

        setLocalDownloadUrl(localUrl);
        setDownloadName(`converted-${Date.now()}.mp4`);
        setProgress(100);
        setStatus('completed');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        cleanupDownload();
        setJobId(null);
        setStatus('pending');
        setError(null);
        setProgress(0);

        try {
            // Server-first for speed (native ffmpeg is much faster than wasm for small files)
            await startServerConversion();
            return;
        } catch (serverError) {
            if (!browserFfmpegSupported) {
                setStatus('error');
                setError(serverError instanceof Error ? serverError.message : 'Conversion failed.');
                return;
            }
        }

        try {
            await startBrowserConversion();
        } catch (browserError) {
            setStatus('error');
            setError(browserError instanceof Error ? browserError.message : 'Conversion failed.');
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (jobId && status === 'processing') {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/status/${jobId}`);
                    if (!res.ok) return;

                    const data = await res.json();
                    if (data.status === 'completed') {
                        setStatus('completed');
                        setProgress(100);
                        clearInterval(interval);
                    } else if (data.status === 'error') {
                        setStatus('error');
                        setError(data.error || 'Conversion failed');
                        clearInterval(interval);
                    } else {
                        setStatus(data.status);
                        setProgress(data.progress || 0);
                    }
                } catch {
                    // no-op
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [jobId, status]);

    const downloadUrl = localDownloadUrl || (jobId ? `/api/download/${jobId}` : null);

    return (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl">
            <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    {t('header')}
                </h2>
                <p className="text-gray-400">{t('subHeader')}</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">
                        Server-first conversion (fast) with browser fallback
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={t('placeholder')}
                        className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-100 placeholder-gray-500 group-hover:border-gray-600"
                        aria-label="M3U8 stream URL"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FileVideo className="text-gray-500 w-5 h-5" />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t('helpButton')}</span>
                    {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showGuide && (
                    <div className="p-4 bg-blue-500/5 border border-blue-500/15 rounded-lg space-y-3 text-sm text-gray-300">
                        <p className="font-medium text-gray-200">{t('guideTitle')}</p>
                        <ol className="list-decimal list-inside space-y-1.5 text-gray-400">
                            <li>{t('step1')}</li>
                            <li>{t('step2')}</li>
                            <li>{t('step3')}</li>
                            <li>{t('step4')}</li>
                        </ol>
                        <Link href="/blog/how-to-find-m3u8-link" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            {t('fullGuide')}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                )}

                <div className="space-y-2 px-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('checklistTitle')}</p>
                    <ul className="space-y-1.5">
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${url.includes('.m3u8') ? 'text-emerald-400' : 'text-gray-600'}`} />
                            <span>{t.rich('linkEndsIn', { code: (c) => <code className="px-1 py-0.5 bg-gray-800/50 rounded text-xs font-mono">{c}</code> })}</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" />
                            <span>{t('publicStream')}</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" />
                            <span>{t('stableInternet')}</span>
                        </li>
                    </ul>
                </div>

                <div className="flex items-start gap-2 px-1">
                    <Shield className="w-3.5 h-3.5 text-amber-500/70 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-500">{t('drmWarning')}</p>
                </div>

                <button
                    type="submit"
                    disabled={status === 'processing' || status === 'pending' || !url}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                    {status === 'processing' || status === 'pending' ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            {t('converting')}
                        </>
                    ) : (
                        t('convertButton')
                    )}
                </button>
            </form>

            {status !== 'idle' && (
                <div className={`p-6 rounded-xl border ${status === 'completed' ? 'bg-green-500/10 border-green-500/20' : status === 'error' ? 'bg-red-500/10 border-red-500/20' : 'bg-blue-500/10 border-blue-500/20'} transition-all duration-500`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {status === 'completed' ? <CheckCircle className="text-green-500 w-6 h-6" /> : status === 'error' ? <AlertCircle className="text-red-500 w-6 h-6" /> : <Loader2 className="text-blue-500 w-6 h-6 animate-spin" />}
                            <span className="font-medium text-gray-200 capitalize">
                                {status === 'completed' ? t('success') : status === 'error' ? t('failed') : t('processing')}
                            </span>
                        </div>
                        <span className="text-sm font-mono text-gray-400">{progress}%</span>
                    </div>

                    {(status === 'processing' || status === 'pending') && (
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                        </div>
                    )}

                    {status === 'completed' && downloadUrl && (
                        <a href={downloadUrl} download={downloadName} className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                            <Download className="w-5 h-5" />
                            {t('download')}
                        </a>
                    )}

                    {status === 'error' && <div className="mt-2 text-red-400 text-sm">{error}</div>}
                </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs text-gray-400 font-medium">{t('poweredBy')}</span>
                </div>
            </div>
        </div>
    );
}
