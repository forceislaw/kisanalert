export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone_number: string | null
          preferred_lang: 'en' | 'hi' | 'mr' | 'te' | 'kn'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone_number?: string | null
          preferred_lang?: 'en' | 'hi' | 'mr' | 'te' | 'kn'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone_number?: string | null
          preferred_lang?: 'en' | 'hi' | 'mr' | 'te' | 'kn'
          created_at?: string
        }
      }
      districts: {
        Row: {
          id: number
          name_en: string
          state_en: string
          latitude: number
          longitude: number
        }
        Insert: {
          id?: number
          name_en: string
          state_en: string
          latitude: number
          longitude: number
        }
        Update: {
          id?: number
          name_en?: string
          state_en?: string
          latitude?: number
          longitude?: number
        }
      }
      crops: {
        Row: {
          id: number
          key_name: string
        }
        Insert: {
          id?: number
          key_name: string
        }
        Update: {
          id?: number
          key_name?: string
        }
      }
      pests: {
        Row: {
          id: number
          key_name: string
          scientific_name: string
          danger_level: 'low' | 'moderate' | 'high' | 'critical'
        }
        Insert: {
          id?: number
          key_name: string
          scientific_name: string
          danger_level: 'low' | 'moderate' | 'high' | 'critical'
        }
        Update: {
          id?: number
          key_name?: string
          scientific_name?: string
          danger_level?: 'low' | 'moderate' | 'high' | 'critical'
        }
      }
      user_notification_prefs: {
        Row: {
          id: string
          user_id: string
          sms_alerts: boolean
          email_alerts: boolean
          critical_only: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sms_alerts?: boolean
          email_alerts?: boolean
          critical_only?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sms_alerts?: boolean
          email_alerts?: boolean
          critical_only?: boolean
          updated_at?: string
        }
      }
      pest_reports: {
        Row: {
          id: string
          user_id: string | null
          crop_id: number | null
          district_id: number | null
          detected_pest_id: number | null
          image_storage_path: string
          severity_level: 'low' | 'moderate' | 'high' | 'critical'
          status: string
          confidence_score: number | null
          latitude: number | null
          longitude: number | null
          diagnosis_translations: Json | null
          countermeasure_translations: Json | null
          prevention_translations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          crop_id?: number | null
          district_id?: number | null
          detected_pest_id?: number | null
          image_storage_path: string
          severity_level: 'low' | 'moderate' | 'high' | 'critical'
          status?: string
          confidence_score?: number | null
          latitude?: number | null
          longitude?: number | null
          diagnosis_translations?: Json | null
          countermeasure_translations?: Json | null
          prevention_translations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          crop_id?: number | null
          district_id?: number | null
          detected_pest_id?: number | null
          image_storage_path?: string
          severity_level?: 'low' | 'moderate' | 'high' | 'critical'
          status?: string
          confidence_score?: number | null
          latitude?: number | null
          longitude?: number | null
          diagnosis_translations?: Json | null
          countermeasure_translations?: Json | null
          prevention_translations?: Json | null
          created_at?: string
        }
      }
    }
  }
}