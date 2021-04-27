export default interface ICreateEventDTO {
  name: string;
  description: string;
  voting_limit_date: Date;
  created_by: string;
  is_public: boolean;
  invitation_code: string;
  img: string;
}