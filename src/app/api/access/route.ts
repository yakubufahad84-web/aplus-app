import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabaseAdmin'


export async function GET(req: NextRequest) {
  const empty = { active: false, expiresAt: null as string | null, courses: [] as string[] }

  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return NextResponse.json(empty)

  const admin = getAdminClient()
  const { data: userData, error } = await admin.auth.getUser(token)
  if (error || !userData.user) return NextResponse.json(empty)

  const { data } = await admin
    .from('course_access')
    .select('expires_at, courses(slug)')
    .eq('user_id', userData.user.id)
    .gt('expires_at', new Date().toISOString())
    .order('expires_at', { ascending: false })

  const rows = (data ?? []) as unknown as Array<{ expires_at: string; courses: { slug: string } | null }>
  return NextResponse.json({
    active: rows.length > 0,
    expiresAt: rows[0]?.expires_at ?? null,
    courses: rows.map((r) => r.courses?.slug).filter(Boolean),
  })
}
