import type TryoutSection from "../entities/tryout.section.interface";

export default interface TryoutSectionStore {
  tryoutSection: TryoutSection | null;
  tryoutSectionloading: boolean;
  tryoutSectionError: string | null;
  fetchTryoutSectionDetail: (id: string) => Promise<void>;
}
