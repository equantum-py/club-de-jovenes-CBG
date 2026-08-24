import { publicAssetUrl, uploadSiteAsset } from '@/lib/site-settings';

export type MerchSettings={
  sectionEnabled:boolean;
  sectionEyebrow:string;
  sectionTitle:string;
  sectionDescription:string;
  bannerEnabled:boolean;
  bannerDesktopPath:string;
  bannerMobilePath:string;
  bannerAlt:string;
  videoPath:string;
  shirtEnabled:boolean;
  shirtName:string;
  shirtDescription:string;
  shirtPrice:number;
  shirtImagePath:string;
  shirtSizes:string[];
  shirtBadge:string;
  capEnabled:boolean;
  capName:string;
  capDescription:string;
  capPrice:number;
  capImagePath:string;
  capBadge:string;
  comboEnabled:boolean;
  comboName:string;
  comboDescription:string;
  comboPrice:number;
  comboOldPrice:number;
  whatsappNumber:string;
};

const defaults:MerchSettings={
  sectionEnabled:false,
  sectionEyebrow:'Merch oficial',
  sectionTitle:'Llevá Gracia Camp con vos.',
  sectionDescription:'Remera y gorra oficial · Edición Gracia Camp 2026. Reservá la tuya antes del campamento.',
  bannerEnabled:false,
  bannerDesktopPath:'',
  bannerMobilePath:'',
  bannerAlt:'Merch oficial Gracia Camp 2026',
  videoPath:'',
  shirtEnabled:true,
  shirtName:'Remera oficial Gracia Camp 2026',
  shirtDescription:'Diseño oficial del campamento. Edición limitada.',
  shirtPrice:100000,
  shirtImagePath:'',
  shirtSizes:['S','M','L','XL','XXL'],
  shirtBadge:'Edición limitada',
  capEnabled:true,
  capName:'Gorra oficial Gracia Camp 2026',
  capDescription:'Gorra ajustable, edición oficial Gracia Camp 2026.',
  capPrice:0,
  capImagePath:'',
  capBadge:'Talle ajustable',
  comboEnabled:true,
  comboName:'Combo Gracia Camp',
  comboDescription:'Remera + Gorra oficial Gracia Camp 2026.',
  comboPrice:0,
  comboOldPrice:0,
  whatsappNumber:'595985194953'
};

function cfg(){
  const url=process.env.SUPABASE_URL?.replace(/\/$/,'');
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)throw new Error('SUPABASE_NOT_CONFIGURED');
  return{url,key};
}

export async function getMerchSettings():Promise<MerchSettings>{
  try{
    const{url,key}=cfg();
    const r=await fetch(`${url}/rest/v1/merch_settings?id=eq.1&select=*`,{headers:{apikey:key,Authorization:`Bearer ${key}`},cache:'no-store'});
    if(!r.ok)return defaults;
    const[x]=await r.json();
    if(!x)return defaults;
    return{
      sectionEnabled:x.section_enabled,
      sectionEyebrow:x.section_eyebrow,
      sectionTitle:x.section_title,
      sectionDescription:x.section_description,
      bannerEnabled:x.banner_enabled??false,
      bannerDesktopPath:x.banner_desktop_path||'',
      bannerMobilePath:x.banner_mobile_path||'',
      bannerAlt:x.banner_alt||defaults.bannerAlt,
      videoPath:x.video_path||'',
      shirtEnabled:x.shirt_enabled,
      shirtName:x.shirt_name,
      shirtDescription:x.shirt_description,
      shirtPrice:x.shirt_price,
      shirtImagePath:x.shirt_image_path||'',
      shirtSizes:x.shirt_sizes||defaults.shirtSizes,
      shirtBadge:x.shirt_badge,
      capEnabled:x.cap_enabled,
      capName:x.cap_name,
      capDescription:x.cap_description,
      capPrice:x.cap_price,
      capImagePath:x.cap_image_path||'',
      capBadge:x.cap_badge,
      comboEnabled:x.combo_enabled,
      comboName:x.combo_name,
      comboDescription:x.combo_description,
      comboPrice:x.combo_price,
      comboOldPrice:x.combo_old_price,
      whatsappNumber:x.whatsapp_number
    };
  }catch{return defaults;}
}

export async function saveMerch(data:Record<string,unknown>){
  const{url,key}=cfg();
  const r=await fetch(`${url}/rest/v1/merch_settings?id=eq.1`,{
    method:'PATCH',
    headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},
    body:JSON.stringify({...data,updated_at:new Date().toISOString()}),
    cache:'no-store'
  });
  if(!r.ok)throw new Error('MERCH_SAVE_FAILED');
}

export async function uploadMerchImage(file:File,prefix:string){return uploadSiteAsset(file,`merch-${prefix}`);}
export function merchImageUrl(path:string,fallback:string){return path?publicAssetUrl(path):fallback;}
export function merchVideoUrl(path:string){return path?publicAssetUrl(path):'';}
