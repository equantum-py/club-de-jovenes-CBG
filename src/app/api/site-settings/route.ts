import {NextResponse} from 'next/server';import {getSiteSettings,publicAssetUrl} from '@/lib/site-settings';
export const dynamic='force-dynamic';
export async function GET(){const s=await getSiteSettings();return NextResponse.json({...s,logoUrl:s.logoPath?publicAssetUrl(s.logoPath):'/logo.png',bannerDesktopUrl:s.bannerDesktopPath?publicAssetUrl(s.bannerDesktopPath):'',bannerMobileUrl:s.bannerMobilePath?publicAssetUrl(s.bannerMobilePath):'',musicUrl:s.musicPath?publicAssetUrl(s.musicPath):''},{headers:{'Cache-Control':'no-store'}});}
