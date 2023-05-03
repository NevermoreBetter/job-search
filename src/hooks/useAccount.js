import { create } from "zustand";

const useAccount = create((set) => ({
  isWorker: true,
  changeAccount: () => set((state) => ({ isWorker: !state.isWorker })),
}));

export default useAccount;
