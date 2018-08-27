export class Adult {
  id: number;
  subscriptionId: number;
  userId: number;
  name: string;
  username: string;
  password: string;
  countOcr: number;
  accessAdmin: boolean = false;
  accessProfiles: boolean = false;

  constructor(subscriptionId: number) {
    this.subscriptionId = subscriptionId
  }
}
