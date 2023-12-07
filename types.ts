export type Company = {
    name: string;
    workers: Worker[];
  };
export type Task = {
    name: string;
    status: string;
    company: Company;
    worker: Worker;
  };
export type Worker = {
    name: string;
    company: Company;
    tasks: Task[];
  };