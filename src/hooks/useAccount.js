import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAccount = create(
  persist(
    (set) => ({
      isWorker: true,
      changeAccount: () => set((state) => ({ isWorker: !state.isWorker })),
    }),
    {
      name: "account-type",
    }
  )
);

export default useAccount;
