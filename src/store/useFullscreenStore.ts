import { create } from 'zustand'

interface FullscreenState {
  isFullscreen: boolean
  zoomLevel: number
  toggleFullscreen: () => void
  setZoomLevel: (level: number) => void
}

export const useFullscreenStore = create<FullscreenState>((set) => ({
  isFullscreen: false,
  zoomLevel: 100,
  toggleFullscreen: () => set((state) => ({ 
    isFullscreen: !state.isFullscreen,
    zoomLevel: !state.isFullscreen ? 100 : state.zoomLevel // Reset zoom khi vào fullscreen
  })),
  setZoomLevel: (level: number) => set({ zoomLevel: Math.max(50, Math.min(150, level)) })
}))

