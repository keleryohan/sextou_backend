import User from "./User";

interface IEventProps {
    name: string;
    description: string;
    votingLimitDate: Date;
    user_creator: User;
  }
  
  class Event {
    public name: string;
    public description: string;
    public votingLimitDate: Date;
    public user_creator: User;

    
    constructor (props: IEventProps) {
      Object.assign(this, props);
  
      this.name = props.name;
      this.description = props.description;
      this.votingLimitDate = props.votingLimitDate;
      this.user_creator = props.user_creator;
    }
  }
  
  export default Event;