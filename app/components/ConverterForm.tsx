
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Download, AlertCircle, FileVideo, CheckCircle, ChevronDown, ChevronUp, HelpCircle, Shield } from 'lucide-react';

export default function ConverterForm() {
    const [url, setUrl] = useState('');
    const [jobId, setJobId] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'pending' | 'processing' | 'completed' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showGuide, setShowGuide] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setStatus('pending');
        setError(null);
        setProgress(0);

        try {
            const res = await fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            if (!res.ok) throw new Error('Failed to start conversion');

            const data = await res.json();
            setJobId(data.id);
            setStatus('processing');
        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (jobId && (status === 'processing' || status === 'pending')) {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`/api/status/${jobId}`);
                    if (!res.ok) {
                        if (res.status === 404) {
                            setStatus('error');
                            setError('Job not found (server might have restarted)');
                            setJobId(null);
                            return;
                        }
                        return;
                    }
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
                        if (data.progress) setProgress(data.progress);
                    }
                } catch (err) {
                    console.error('Polling error:', err);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [jobId, status]);

    const downloadUrl = jobId ? `/api/download/${jobId}` : null;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl">
            {/* Header with System Status */}
            <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    M3U8 to MP4 Converter
                </h2>
                <p className="text-gray-400">Convert streaming videos to MP4 format instantly</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">System Status: Operational</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter .m3u8 URL here..."
                        className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-100 placeholder-gray-500 group-hover:border-gray-600"
                        aria-label="M3U8 stream URL"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FileVideo className="text-gray-500 w-5 h-5" />
                    </div>
                </div>

                {/* Inline Micro-Guide Toggle */}
                <button
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Need help finding an M3U8 link?</span>
                    {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Collapsible Micro-Guide */}
                {showGuide && (
                    <div className="p-4 bg-blue-500/5 border border-blue-500/15 rounded-lg space-y-3 text-sm text-gray-300">
                        <p className="font-medium text-gray-200">Quick 4-step guide:</p>
                        <ol className="list-decimal list-inside space-y-1.5 text-gray-400">
                            <li>Open the page with the video and press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-gray-300">F12</kbd> to open DevTools</li>
                            <li>{'Click the '}<strong className="text-gray-300">Network</strong>{' tab'}</li>
                            <li>{'Type '}<code className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-blue-300">m3u8</code>{' in the filter box, then play the video'}</li>
                            <li>{'Right-click the request ending in '}<code className="px-1.5 py-0.5 bg-gray-800 rounded text-xs font-mono text-blue-300">.m3u8</code>{' and copy the URL'}</li>
                        </ol>
                        <Link
                            href="/blog/how-to-find-m3u8-link"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            Read the full step-by-step guide
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                )}

                {/* Checklist for Success */}
                <div className="space-y-2 px-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Checklist for success</p>
                    <ul className="space-y-1.5">
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${url.includes('.m3u8') ? 'text-emerald-400' : 'text-gray-600'}`} />
                            <span>{'Link ends in '}<code className="px-1 py-0.5 bg-gray-800/50 rounded text-xs font-mono">.m3u8</code></span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" />
                            <span>Stream is publicly accessible (no login required)</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" />
                            <span>Stable internet connection</span>
                        </li>
                    </ul>
                </div>

                {/* DRM/CORS Warning */}
                <div className="flex items-start gap-2 px-1">
                    <Shield className="w-3.5 h-3.5 text-amber-500/70 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-500">
                        DRM-protected streams (Netflix, YouTube, Hulu) and CORS-restricted URLs cannot be converted.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={status === 'processing' || status === 'pending' || !url}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                    {status === 'processing' || status === 'pending' ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            Converting...
                        </>
                    ) : (
                        'Start Conversion'
                    )}
                </button>
            </form>

            {/* Status Cards */}
            {status !== 'idle' && (
                <div className={`p-6 rounded-xl border ${status === 'completed' ? 'bg-green-500/10 border-green-500/20' :
                        status === 'error' ? 'bg-red-500/10 border-red-500/20' :
                            'bg-blue-500/10 border-blue-500/20'
                    } transition-all duration-500`}>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {status === 'completed' ? <CheckCircle className="text-green-500 w-6 h-6" /> :
                                status === 'error' ? <AlertCircle className="text-red-500 w-6 h-6" /> :
                                    <Loader2 className="text-blue-500 w-6 h-6 animate-spin" />}
                            <span className="font-medium text-gray-200 capitalize">
                                {status === 'completed' ? 'Conversion Successful' :
                                    status === 'error' ? 'Conversion Failed' :
                                        'Processing Video...'}
                            </span>
                        </div>
                        <span className="text-sm font-mono text-gray-400">{progress}%</span>
                    </div>

                    {(status === 'processing' || status === 'pending') && (
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}

                    {status === 'completed' && downloadUrl && (
                        <a
                            href={downloadUrl}
                            download
                            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                            <Download className="w-5 h-5" />
                            Download MP4
                        </a>
                    )}

                    {status === 'error' && (
                        <div className="mt-2 text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                </div>
            )}

            {/* Powered by FFmpeg Badge */}
            <div className="flex items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs text-gray-400 font-medium">Powered by FFmpeg</span>
                </div>
            </div>
        </div>
    );
}
