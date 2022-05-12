let a: number;
let b: boolean;
let c: string;

let d: Array<string>;

type Permission = "admin" | "user" | "manager";

type PermissionsWithoutAdmin = Exclude<Permission, "admin">;

interface DepartmentsForPermission {
  dapName: string;
  lvl: number;
}

const DepsForPerms: Record<Permission, DepartmentsForPermission> = {
  admin: {
    dapName: "securoty",
    lvl: 10,
  },
  user: {
    dapName: "sales",
    lvl: 5,
  },
  manager: {
    dapName: "sales",
    lvl: 8,
  },
};

type TuplePermissions = [Permission, Permission];

const Perm: TuplePermissions = ["admin", "user"];

type BasicUser<A = boolean, P = TuplePermissions> = {
  readonly name: string;
  surname: string;
  age: number;
  isAdmin: A;
  permission?: P;
};

type BasicUserReadOnly = Readonly<BasicUser>;
type BasicUserReqired = Required<BasicUser>;
type BasicUserPartial = Partial<BasicUser>;

type BasicUserWithoutPermission = Omit<BasicUser, "permission">;

type BasicUserReadOnlyRequired = Readonly<Required<BasicUser>>;

type AdvanceUser = {
  account: number;
};

type FullUser<A = boolean, P = string[]> = BasicUser<A, P> & AdvanceUser;

// interface UserWithPermission extends BasicUser {
//   permission: string[];
// }

// const user2: BasicUser<number> = {
//   name: "Nick",
//   surname: "GGG",
//   age: 23,
//   isAdmin: 1,
//   permission: ["manager", "operator", "instructor"],
// };

const user: FullUser<boolean> = {
  name: "Nick",
  surname: "GGG",
  age: 23,
  isAdmin: true,
  account: 1,
  permission: ["admin", "user"],
};

let userArray: FullUser<boolean>[] = [user, user, user];

function getFirstUser<T>(arr: T[]): T {
  return arr[0];
}

type BasicFunction = () => string;

type getFirstReturnType = ReturnType<BasicFunction>;

getFirstUser<FullUser<boolean>>(userArray);

type MathFunc = (a: number, b: number) => number;

const mul: MathFunc = (a, b) => {
  return a * b;
};
const add: MathFunc = (a, b) => {
  return a + b;
};

// const logFunction = (data: unknown): never => {
//   const data2: unknown = data;
//   console.log(data);
//   console.log(data2);
//   throw new Error("BAD");
// };
