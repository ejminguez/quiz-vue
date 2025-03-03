export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      CHOICE: {
        Row: {
          choice_id: string
          choice_text: string
          is_correct: boolean
          question_id: string
        }
        Insert: {
          choice_id: string
          choice_text: string
          is_correct?: boolean
          question_id: string
        }
        Update: {
          choice_id?: string
          choice_text?: string
          is_correct?: boolean
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "CHOICE_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "QUESTION"
            referencedColumns: ["question_id"]
          },
        ]
      }
      QUESTION: {
        Row: {
          question_id: string
          question_text: string
          quiz_id: string
        }
        Insert: {
          question_id: string
          question_text: string
          quiz_id: string
        }
        Update: {
          question_id?: string
          question_text?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "QUESTION_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "QUIZ"
            referencedColumns: ["quiz_id"]
          },
        ]
      }
      QUESTION_RESPONSE: {
        Row: {
          attempt_id: string
          question_id: string
          response_id: string
          score: number
          selected_choice_id: string | null
        }
        Insert: {
          attempt_id: string
          question_id: string
          response_id: string
          score?: number
          selected_choice_id?: string | null
        }
        Update: {
          attempt_id?: string
          question_id?: string
          response_id?: string
          score?: number
          selected_choice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "QUESTION_RESPONSE_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "QUIZ_ATTEMPT"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "QUESTION_RESPONSE_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "QUESTION"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "QUESTION_RESPONSE_selected_choice_id_fkey"
            columns: ["selected_choice_id"]
            isOneToOne: false
            referencedRelation: "CHOICE"
            referencedColumns: ["choice_id"]
          },
        ]
      }
      QUIZ: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          is_timed: boolean
          quiz_id: string
          randomize_questions: boolean
          time_limit: number | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          is_timed?: boolean
          quiz_id: string
          randomize_questions?: boolean
          time_limit?: number | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          is_timed?: boolean
          quiz_id?: string
          randomize_questions?: boolean
          time_limit?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "QUIZ_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "USER"
            referencedColumns: ["user_id"]
          },
        ]
      }
      QUIZ_ATTEMPT: {
        Row: {
          attempt_id: string
          completed: boolean
          end_time: string | null
          quiz_id: string
          start_time: string
          total_score: number | null
          user_id: string
        }
        Insert: {
          attempt_id: string
          completed?: boolean
          end_time?: string | null
          quiz_id: string
          start_time?: string
          total_score?: number | null
          user_id: string
        }
        Update: {
          attempt_id?: string
          completed?: boolean
          end_time?: string | null
          quiz_id?: string
          start_time?: string
          total_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "QUIZ_ATTEMPT_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "QUIZ"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "QUIZ_ATTEMPT_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "USER"
            referencedColumns: ["user_id"]
          },
        ]
      }
      USER: {
        Row: {
          email_address: string
          is_authorized: boolean
          password_hash: string
          user_id: string
          username: string
        }
        Insert: {
          email_address: string
          is_authorized?: boolean
          password_hash: string
          user_id: string
          username: string
        }
        Update: {
          email_address?: string
          is_authorized?: boolean
          password_hash?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
