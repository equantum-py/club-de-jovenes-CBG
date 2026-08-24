import { NextResponse } from 'next/server';
import { getMerchSettings, merchVideoUrl } from '@/lib/merch-settings';

export const dynamic='force-dynamic';

export async function GET(){
  const settings=await getMerchSettings();
  const url=merchVideoUrl(settings.videoPath);
  if(!url)return new NextResponse('Video promocional no configurado.',{status:404,headers:{'Cache-Control':'no-store'}});
  return NextResponse.redirect(url,307);
}
