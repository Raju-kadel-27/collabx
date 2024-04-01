// Chat related types

export interface FetchAllChats {
    userId: string;
  }
  
  export interface AccessChat {
      ownId: string;
      peerId: string;
    }
  
    export interface CreateGroup {
      chatName: string;
      users: string[];
      isGroupChat: boolean;
      groupAdmin: string;
    }
  
    export interface RenameGroup {
      chatName: string;
      chatId: string;
    }
  
  export interface AddToGroup {
    chatId: string;
    userId: string;
  }
  
  export interface RemoveFromGroup {
    chatId: string;
    userId: string;
  }