import{NextResponse}from'next/server';
import{getMerchSettings,merchImageUrl,merchVideoUrl}from'@/lib/merch-settings';
export const dynamic='force-dynamic';
export async function GET(){
  const s=await getMerchSettings();
  return NextResponse.json({
    ...s,
    bannerDesktopUrl:merchImageUrl(s.bannerDesktopPath,''),
    bannerMobileUrl:merchImageUrl(s.bannerMobilePath,''),
    shirtImageUrl:merchImageUrl(s.shirtImagePath,'/campamento/remera-nueva.png'),
    capImageUrl:merchImageUrl(s.capImagePath,''),
    videoUrl:merchVideoUrl(s.videoPath)
  },{headers:{'Cache-Control':'no-store'}});
}
