export interface DeleteModalPropType {
    deleteId: number;
    titleDescription: string;
    handleDeleteFunction: (deleteId: number) => Promise<void>;
  }