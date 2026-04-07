export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    avatarUrl?: string;
    old_password?: string | null;
    new_password: string;
}
