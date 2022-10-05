export interface Rep {
  id?: string;
  number: number;
  startTime: string;
  endTime: string;
}

export interface Exercise {
  id?: string | null;
  type: string;
  startTime: string;
  endTime: string;
  reps: Rep[];
}

export {};
