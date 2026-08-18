import {NextResponse} from 'next/server';import {getPreacherSettings,preacherImageUrl} from '@/lib/preacher-settings';
export const dynamic='force-dynamic';
export async function GET(){const s=await getPreacherSettings();return NextResponse.json({...s,photoUrl:preacherImageUrl(s.photoPath),bannerDesktopUrl:preacherImageUrl(s.bannerDesktopPath),bannerMobileUrl:preacherImageUrl(s.bannerMobilePath)},{headers:{'Cache-Control':'no-store'}})}
