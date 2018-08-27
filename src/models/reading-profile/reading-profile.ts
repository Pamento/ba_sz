export class ReadingProfile {
  id: number;
  name: string;
  isDefault: boolean;
  processes: Process[];
  processList: ProcessList;
  profileGroup: { id: number; name: string };
  leaf: boolean;
  profiles: ReadingProfile[];
  constructor(data?) {
    console.log("constructor", data);
    if (data) {
      this.update(data);
    }
  }

  update(data) {
    for (let key in data) {
      console.log("updating profile", key, data);
      switch (key) {
        default:
          this[key] = data[key];
      }
    }
  }
}
export const FONT_GROUP = "Polices";
export const TYPO_GROUP = "Typographiques";
export const SPECIFIC_GROUP = "Spécifiques";
export const SOUND_GROUP = "Sons";
export const LETTER_GROUP = "Lettres";

export class Process {
  id: number;
  name: string;
  groupName: string;
  lineNo: number;
  seqNo: number;
  excludeGroup: string;
  cssLines: {
    id: number;
    name: string;
    declaration: string;
    expression: string;
    defaultValue: string;
    param: string;
    htmlView: string;
    lineNo: number;
  }[];
}
export class ProcessList {
  serverList: any[];
  clientList: any[];
}

export const LETTER_DISTANCES = [
  { value: "3px", label: "1" },
  { value: "6px", label: "2" },
  { value: "9px", label: "3" }
]; //id=1000024
export const WORD_DISTANCES = [
  { value: "8px", label: "1" },
  { value: "15px", label: "2" },
  { value: "23px", label: "3" },
  { value: "32px", label: "4" }
]; //id=1000029
export const LINE_HEIGHTS = [
  { value: "24px", label: "1,5" },
  { value: "32px", label: "2" },
  { value: "40px", label: "2,5" },
  { value: "48px", label: "3" }
]; //id=1000004
export const FONT_SIZES = [
  { value: "16px", label: "12" },
  { value: "19px", label: "14" },
  { value: "21.4px", label: "16" },
  { value: "24px", label: "18" },
  { value: "26px", label: "20" }
]; //id=1000010
