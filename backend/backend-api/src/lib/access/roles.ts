export const ROLES = {
    // A person can give role to other peers only if it has (promotable:true)
    // Role(s) to peers can be provided (equivalent or less than) of providers role.

    // Example: A moderator(provider) can give role of both presenter and moderator to peers
    ADMIN: { id: 9345, label: 'admin', level: 50, promotable: true },
    MODERATOR: { id: 8383, label: 'moderator', level: 40, promotable: true },
    PRESENTER: { id: 7398, label: 'presenter', level: 30, promotable: true },
    AUTHENTICATED: { id: 6895, label: 'authenticated', level: 20, promotable: false },

    // Initially all peers have normal role(default)
    NORMAL: { id: 7564, label: 'normal', level: 10, promotable: false }
}
