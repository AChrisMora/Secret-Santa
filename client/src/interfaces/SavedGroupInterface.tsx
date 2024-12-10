export interface Match {
    giver: string;
    receiver: string;
}

export interface Group {
    _id: string;
    name: string;
    members: string[];
    matches: Match[];
}