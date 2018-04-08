export interface Category {
    id?: string;
    name: string;
    description: string;
    team: Team;
    innovation?: Innovation[];
}

export interface Innovation {
    title: string;
    cat_innovation_id: number;
    description: string;
    team: Team;
    status: InnovationStatus;
    thumbnail?: string;
    content?: Content;
    rating?: Rating;
    comments?: Comment[];
}

export interface Content {
    url: string;
    type: ContentType;
}

export type ContentType = 'video' | 'pdf' | 'presentation';
export type InnovationStatus = 'ideation' | 'prototype' | 'completed';

export interface Rating {
    thumbsUp: number;
    thumbsDown: number;
}

export interface Comment {
    description: string;
    userName?: string;
    addedOn?: string;
}

export interface Team {
    image?: string;
    name: string;
    phone?: string;
    email?: string;
    participants?: Participant[];
}

export interface Participant {
    name: string;
    phone?: string;
    email?: string;
}
