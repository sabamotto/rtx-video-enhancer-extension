// NVIDIA RTX Super Upsampling Trigger
// content.js for Chrome Extension

class RTXUpsamplingTrigger {
    constructor() {
        this.currentVideo = null; // 現在オーバーレイが適用されているvideo要素
        this.overlay = null; // オーバーレイ要素（1つだけ）
        this.observer = null; // MutationObserver
        this.resizeObserver = null; // ResizeObserver
        this.init();
    }

    init() {
        // 初期ロード時の処理（1秒遅延）
        setTimeout(() => {
            this.processVideos();
        }, 1000);

        // 動的に追加される要素を監視
        this.setupMutationObserver();

        // フルスクリーン変更を監視
        this.setupFullscreenListener();

        // ページの可視性変更を監視（タブ切り替えなど）
        document.addEventListener('visibilitychange', () => {
            this.repositionOverlay(); // HTML構造の確認
            this.updateOverlay();
        });

        // リサイズイベントを監視
        window.addEventListener('resize', () => {
            this.repositionOverlay(); // HTML構造の確認
            this.processVideos(); // リサイズ時に最大サイズのvideo要素が変わる可能性
        });
    }

    processVideos() {
        const videos = document.querySelectorAll('video');
        console.log(`RTX Upsampling Trigger: Found ${videos.length} video elements, selecting the largest one`);
        
        if (videos.length === 0) {
            this.removeOverlay();
            return;
        }

        // 最もサイズの大きいvideo要素を見つける
        const largestVideo = this.findLargestVideo(videos);
        
        if (largestVideo && largestVideo !== this.currentVideo) {
            this.removeOverlay();
            this.addOverlayToVideo(largestVideo);
        } else if (largestVideo === this.currentVideo) {
            // 同じvideo要素の場合は位置だけ更新
            this.updateOverlay();
        }
    }

    findLargestVideo(videos) {
        let largestVideo = null;
        let maxSize = 0;

        videos.forEach(video => {
            try {
                const rect = video.getBoundingClientRect();
                const size = rect.width * rect.height;
                
                // 表示されていない要素は除外
                if (size > 0 && rect.width > 0 && rect.height > 0) {
                    if (size > maxSize) {
                        maxSize = size;
                        largestVideo = video;
                    }
                }
            } catch (error) {
                console.warn('RTX Upsampling Trigger: Error calculating video size:', error);
            }
        });

        if (largestVideo) {
            console.log(`RTX Upsampling Trigger: Largest video found, size: ${maxSize}px²`);
        }
        return largestVideo;
    }

    setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            let videoChanges = false;

            mutations.forEach(mutation => {
                // 新しく追加されたvideo要素をチェック
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'VIDEO') {
                            videoChanges = true;
                        } else {
                            // 子要素にvideo要素があるかチェック
                            const videos = node.querySelectorAll && node.querySelectorAll('video');
                            if (videos && videos.length > 0) {
                                videoChanges = true;
                            }
                        }
                    }
                });

                // 削除されたvideo要素をチェック
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'VIDEO') {
                            videoChanges = true;
                        } else {
                            // 削除されたノード内のvideo要素をチェック
                            const videos = node.querySelectorAll && node.querySelectorAll('video');
                            if (videos && videos.length > 0) {
                                videoChanges = true;
                            }
                        }
                    }
                });
            });

            // video要素に変更があった場合、最大サイズのvideo要素を再評価
            if (videoChanges) {
                setTimeout(() => this.processVideos(), 100); // 少し遅延を入れて要素が安定してから処理
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    setupFullscreenListener() {
        // Chrome用フルスクリーン状態の変化を監視
        document.addEventListener('fullscreenchange', () => {
            setTimeout(() => {
                // フルスクリーン変更時はHTML構造が変わる可能性があるため
                // オーバーレイの配置も再確認する
                this.repositionOverlay();
                this.updateOverlay();
            }, 100); // 少し遅延を入れて確実に更新
        });
    }

    addOverlayToVideo(video) {
        if (this.currentVideo === video && this.overlay) {
            return; // 既に同じvideo要素にオーバーレイが適用されている
        }

        console.log('RTX Upsampling Trigger: Adding overlay to the largest video element');

        // 既存のオーバーレイとリスナーを削除
        this.removeOverlay();

        // オーバーレイ要素を作成
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background-color: black;
            opacity: 0.01;
            pointer-events: none;
            z-index: 999999;
            top: -1px;
            left: 0px;
            margin: 0;
            padding: 0;
        `;

        // 一意のIDを設定
        this.overlay.setAttribute('data-rtx-upsampling-overlay', 'true');

        // video要素の直後に挿入
        this.insertOverlayAfterVideo(video);

        // 現在のvideo要素を記録
        this.currentVideo = video;

        // 初期位置を設定
        this.updateOverlay();

        // video要素のイベントリスナーを設定
        this.setupVideoEventListeners(video);
    }

    insertOverlayAfterVideo(video) {
        try {
            const parent = video.parentNode;
            if (parent) {
                // video要素の次の兄弟要素の前に挿入（video要素の直後）
                parent.insertBefore(this.overlay, video.nextSibling);
                console.log('RTX Upsampling Trigger: Overlay inserted after video element');
            } else {
                // parentNodeがない場合はbodyに追加（フォールバック）
                document.body.appendChild(this.overlay);
                console.warn('RTX Upsampling Trigger: Video has no parent, appending to body');
            }
        } catch (error) {
            console.warn('RTX Upsampling Trigger: Error inserting overlay:', error);
            // エラー時はbodyに追加（フォールバック）
            document.body.appendChild(this.overlay);
        }
    }

    repositionOverlay() {
        if (!this.currentVideo || !this.overlay) {
            return;
        }

        try {
            // オーバーレイが現在のvideo要素の直後にあるかチェック
            const parent = this.currentVideo.parentNode;
            if (parent && this.overlay.parentNode !== parent) {
                // 親が変わった場合は再挿入
                console.log('RTX Upsampling Trigger: Repositioning overlay due to structure change');
                this.overlay.remove();
                this.insertOverlayAfterVideo(this.currentVideo);
            } else if (!parent) {
                // video要素の親がない場合（削除された可能性）
                this.removeOverlay();
                this.processVideos(); // 新しい最大video要素を検索
            }
        } catch (error) {
            console.warn('RTX Upsampling Trigger: Error repositioning overlay:', error);
        }
    }

    removeOverlay() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            console.log('RTX Upsampling Trigger: Removed overlay');
        }

        // ResizeObserverをクリーンアップ
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

        this.currentVideo = null;
    }

    updateOverlay() {
        if (!this.currentVideo || !this.overlay) {
            return;
        }

        try {
            // Chrome用フルスクリーン状態をチェック
            const fullscreenElement = document.fullscreenElement;

            if (fullscreenElement) {
                // フルスクリーン状態の場合
                if (fullscreenElement === this.currentVideo || fullscreenElement.contains(this.currentVideo)) {
                    // フルスクリーン時は固定位置
                    this.overlay.style.position = 'fixed';
                    this.overlay.style.top = '0px';
                    this.overlay.style.left = '0px';
                    this.overlay.style.zIndex = '2147483647'; // 最大値
                    return;
                }
            }

            // 通常状態の場合 - video要素の直後に配置されているので相対位置で調整
            const parent = this.currentVideo.parentNode;
            if (parent && this.overlay.parentNode === parent) {
                // video要素と同じ親を持つ場合は相対位置
                this.overlay.style.position = 'absolute';
                this.overlay.style.top = '-1px'; // video要素の上に1px重ねる
                this.overlay.style.left = '0px';
                this.overlay.style.zIndex = '999999';
            } else {
                // フォールバック: 絶対位置で video要素の位置に合わせる
                const rect = this.currentVideo.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                this.overlay.style.position = 'absolute';
                this.overlay.style.top = (rect.top + scrollTop - 1) + 'px'; // 1px上に配置
                this.overlay.style.left = (rect.left + scrollLeft) + 'px';
                this.overlay.style.zIndex = '999999';
            }

        } catch (error) {
            console.warn('RTX Upsampling Trigger: Error updating overlay position:', error);
        }
    }

    setupVideoEventListeners(video) {
        // video要素の位置やサイズが変わった時の対応
        const updatePosition = () => {
            if (this.currentVideo === video) {
                this.repositionOverlay(); // 構造変更もチェック
                this.updateOverlay();
            }
        };

        // video要素のサイズ変更時に最大サイズのvideo要素が変わる可能性があるため再評価
        const reevaluateVideos = () => {
            setTimeout(() => {
                if (this.currentVideo === video) {
                    this.processVideos();
                }
            }, 100);
        };

        // video要素のイベントリスナー
        video.addEventListener('loadedmetadata', updatePosition);
        video.addEventListener('resize', reevaluateVideos);

        // 既存のResizeObserverがあればクリーンアップ
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        // 新しいResizeObserverを作成
        this.resizeObserver = new ResizeObserver((entries) => {
            if (this.currentVideo === video) {
                reevaluateVideos();
            }
        });
        this.resizeObserver.observe(video);
    }

    // クリーンアップ関数
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

        this.removeOverlay();
    }
}

// スクリプトの実行
let rtxTrigger = null;

try {
    rtxTrigger = new RTXUpsamplingTrigger();
    console.log('RTX Upsampling Trigger: Initialized successfully');
} catch (error) {
    console.error('RTX Upsampling Trigger: Initialization failed:', error);
}

// ページがアンロードされる時のクリーンアップ
window.addEventListener('beforeunload', () => {
    if (rtxTrigger) {
        rtxTrigger.destroy();
    }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getVideoStatus') {
        const videos = document.querySelectorAll('video');
        sendResponse({ hasVideo: videos.length > 0 });
    } else if (request.action === 'toggleEnabled') {
        if (request.enabled && !rtxTrigger) {
            rtxTrigger = new RTXUpsamplingTrigger();
            console.log('RTX Upsampling Trigger: Re-enabled');
        } else if (!request.enabled && rtxTrigger) {
            rtxTrigger.destroy();
            rtxTrigger = null;
            console.log('RTX Upsampling Trigger: Disabled');
        }
    }
    return true;
});