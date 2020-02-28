export class UserInfo {
  constructor(
    public username: string,
    public password: string,
    public displayname: string,
    public email: string,
    public _id?: string,
    public firstName?: string,
    public lastName?: string,
    public city?: string,
    public about?: string,
    public mySkills?: Array<object>,
    public learnSkills?: Array<object>,
    ) {}

}

