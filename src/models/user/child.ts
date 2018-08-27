export class Child {
  id: number;
  subscriptionId: number;
  userId: number;
  name: string;
  username: string;
  password: string;
  countOcr: number;
  isViewProfile: boolean = true;
  isViewAccount: boolean = true;
  profileId: number;

  constructor(subscriptionId: number) {
    this.subscriptionId = subscriptionId
  }

}
