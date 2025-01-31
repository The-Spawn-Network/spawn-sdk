import { Chat, ChatPayload, ChatResponse } from './chat';
import { Knowledge } from './knowledge';
import { LLM } from './llm';
import { Presenter } from './presenter';

// @deprecated - only for backwards compatibility
export enum UserPlan {
    TRIAL = 'trial',
    BASIC = 'basic',
    ENTERPRISE = 'enterprise',
    LITE = 'lite',
    ADVANCED = 'advanced',
}

export enum PlanGroup {
    TRIAL = 'spawn-trial',
    PRO = 'spawn-pro',
    ENTERPRISE = 'spawn-enterprise',
    LITE = 'spawn-lite',
    ADVANCED = 'spawn-advanced',
    BUILD = 'spawn-api-build',
    LAUNCH = 'spawn-api-launch',
    SCALE = 'spawn-api-scale',
}

export enum AgentStatus {
    Created = 'created',
    Started = 'started',
    Done = 'done',
    Error = 'error',
    Rejected = 'rejected',
    Ready = 'ready',
}

export interface Agent {
    id: string;
    username?: string;
    presenter: Presenter;
    llm?: LLM;
    knowledge?: Knowledge;
    use_case?: string;
    tags?: string[];
    chats?: number;
    greetings?: string[];
    access?: 'private' | 'pending-public' | 'unlisted' | 'rejected' | 'public';
    metadata?: { plan: PlanGroup | UserPlan };

    preview_name?: string;
    preview_description?: string;
    preview_thumbnail?: string;
    logo?: string;
    preview_url?: string;
    owner_id?: string;
    status?: AgentStatus;
}

export type AgentPayload = Omit<
    Agent,
    'type' | 'created_at' | 'modified_at' | 'id' | 'owner_id' | 'metadata' | 'idle_video_url'
>;

export interface AgentsAPI {
    create(payload: AgentPayload, options?: RequestInit): Promise<Agent>;
    getAgents(tag?: string, options?: RequestInit): Promise<Agent[]>;
    getById(id: string, options?: RequestInit): Promise<Agent>;
    delete(id: string, options?: RequestInit): Promise<void>;
    update(id: string, payload: AgentPayload, options?: RequestInit): Promise<Agent>;
    newChat(agentId: string, payload: { persist: boolean }, options?: RequestInit): Promise<Chat>;
    chat(agentId: string, chatId: string, payload: ChatPayload, options?: RequestInit): Promise<ChatResponse>;
}
