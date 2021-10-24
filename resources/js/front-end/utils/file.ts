import { ChangeEvent } from "react";

export const readSingleFileAsDataURL = async (
  e?: ChangeEvent<HTMLInputElement>,
): Promise<File> =>
  new Promise(resolve => {
    const reader: FileReader = new FileReader();
    const file = e!.target.files![0];
    reader.onloadend = () => {
      if (reader.result) {
        resolve(file);
      }
    };
    reader.readAsDataURL(file);
  });
