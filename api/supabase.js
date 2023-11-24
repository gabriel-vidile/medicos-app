import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mebdvqkicqmelyhtucat.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYmR2cWtpY3FtZWx5aHR1Y2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3OTEyMDMsImV4cCI6MjAxNjM2NzIwM30.-LOPLv9-o0MBBGojQR-LWQPC4zCouPDfZJGTE_FTiq4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)