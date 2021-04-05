namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        // NOTE: It could be either senderId and recepientId
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread"; // Inbox, outbox and default which is "unread"
    }
}