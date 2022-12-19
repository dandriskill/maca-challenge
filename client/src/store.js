import create from 'zustand';

export const useFilesStore = create((set) => ({
    // Insights
    insights: [],
    setInsights: (insights) => set(() => ({ insights: insights || [] })),
    clearInsights: () => set({ insights: [] }),

    // Files
    files: [],
    setFiles: (files) => set(() => ({ files: files || [] })),
    clearFiles: () => set({ files: [] }),
}));
