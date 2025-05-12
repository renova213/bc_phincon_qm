import type TryoutSection from "../entities/tryout.section.interface";

export default interface TryoutSectionStore {
  tryoutSections: TryoutSection[];
  tryoutSectionloading: boolean;
  tryoutSectionError: string | null;
  fetchTryoutSections: () => Promise<void>;
}
