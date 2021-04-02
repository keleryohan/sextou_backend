interface IUserProps {
  name: string;
  email: string;
  password: string
}

class User {
  public name: string;
  public email: string;
  public password: string;
  
  constructor (props: IUserProps) {
    Object.assign(this, props);

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}

export default User;