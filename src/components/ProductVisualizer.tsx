import React from 'react';
import { Product, ProductColor } from '../types.ts';

interface ProductVisualizerProps {
  product: Product;
  selectedColor?: ProductColor;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  view?: 'front' | 'back' | 'angled';
}

export const ProductVisualizer: React.FC<ProductVisualizerProps> = ({
  product,
  selectedColor,
  size = 'md',
  view = 'angled',
}) => {
  const activeColor = selectedColor || product.availableColors[0];
  const isIPhone = product.category === 'iphone';

  // Size specifications
  const dimensions = {
    sm: 'w-24 h-28',
    md: 'w-48 h-64',
    lg: 'w-64 h-80',
    hero: 'w-72 md:w-96 h-96 md:h-[480px]',
  }[size];

  if (!isIPhone) {
    // Render high fidelity vector graphics for accessories
    if (product.id.includes('airpods')) {
      return (
        <div className={`${dimensions} flex items-center justify-center relative select-none`}>
          <div className="relative w-40 h-32 flex items-center justify-center">
            {/* Soft shadow */}
            <div className="absolute -bottom-2 w-32 h-6 bg-black/40 blur-md rounded-full" />
            {/* AirPods Pro Case */}
            <div className="relative w-36 h-28 rounded-[28px] bg-gradient-to-b from-white via-zinc-100 to-zinc-200 border border-white/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              {/* Lid seam */}
              <div className="absolute top-9 left-0 right-0 h-[1.5px] bg-zinc-300" />
              {/* LED status light */}
              <div className="absolute top-14 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              {/* Glossy reflection highlight */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
              {/* Speaker grill at bottom */}
              <div className="absolute bottom-2 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-2.5 h-1.5 rounded-sm bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              </div>
            </div>
            {/* Protruding Earbud Stems */}
            <div className="absolute -top-6 -left-3 w-8 h-16 rounded-full bg-gradient-to-r from-zinc-100 to-white shadow-lg rotate-[-20deg] border border-zinc-200">
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-zinc-300" />
            </div>
            <div className="absolute -top-6 -right-3 w-8 h-16 rounded-full bg-gradient-to-r from-zinc-100 to-white shadow-lg rotate-[20deg] border border-zinc-200">
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>
      );
    }

    if (product.id.includes('watch')) {
      return (
        <div className={`${dimensions} flex items-center justify-center relative select-none`}>
          <div className="relative w-36 h-48 flex items-center justify-center">
            {/* Orange Alpine Loop Strap */}
            <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-b from-orange-600 via-orange-500 to-orange-600 rounded-2xl shadow-xl flex flex-col justify-between py-2 border-x-2 border-orange-700/50">
              <div className="w-full h-2 bg-orange-700/40 rounded-full" />
              <div className="w-full h-2 bg-orange-700/40 rounded-full" />
            </div>
            {/* Rugged Titanium Chassis */}
            <div className="relative z-10 w-32 h-36 rounded-[34px] bg-gradient-to-br from-[#9b968d] via-[#7d7971] to-[#605d57] p-2 shadow-2xl border border-zinc-400/40">
              {/* Digital Crown & Action Button */}
              <div className="absolute -right-2 top-8 w-2 h-7 rounded-sm bg-gradient-to-b from-orange-500 to-orange-600 border border-orange-400 shadow-md" />
              <div className="absolute -left-1.5 top-12 w-1.5 h-8 rounded-sm bg-orange-500 shadow-md" />
              {/* Sapphire Glass Screen */}
              <div className="w-full h-full rounded-[26px] bg-black p-3 flex flex-col justify-between border border-zinc-800">
                <div className="flex justify-between items-center text-[10px] text-orange-400 font-mono font-bold">
                  <span>ULTRA 2</span>
                  <span className="text-zinc-400">10:09</span>
                </div>
                <div className="text-center font-display font-extrabold text-white text-2xl tracking-tighter">
                  09:41
                </div>
                <div className="flex justify-between items-center text-[9px] text-zinc-400">
                  <span className="text-emerald-400">● 98%</span>
                  <span className="text-purple-400">4,280 KM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (product.id.includes('magsafe') || product.id.includes('adapter')) {
      return (
        <div className={`${dimensions} flex items-center justify-center relative select-none`}>
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 p-3 shadow-2xl border border-white/60 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-zinc-100 shadow-inner flex items-center justify-center border border-zinc-300">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-500/50 flex items-center justify-center">
                <span className="text-[10px] font-bold text-zinc-600 tracking-wider">25W</span>
              </div>
            </div>
            {/* Magnetic Ring highlight */}
            <div className="absolute inset-2 rounded-full border border-white/50 pointer-events-none" />
          </div>
        </div>
      );
    }

    // Default Case Accessory
    return (
      <div className={`${dimensions} flex items-center justify-center relative select-none`}>
        <div
          className="relative w-36 h-56 rounded-[28px] p-2 shadow-2xl border border-white/10 flex flex-col items-center justify-center"
          style={{ backgroundColor: activeColor.hex }}
        >
          {/* MagSafe Ring Outline on Case */}
          <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/20" />
          </div>
          <div className="w-1.5 h-6 bg-white/30 rounded-full mt-2" />
          {/* Raised Camera Cutout */}
          <div className="absolute top-3 left-3 w-12 h-12 rounded-2xl bg-black/40 border border-white/20" />
        </div>
      </div>
    );
  }

  // IPHONE RENDERING: Precision Realistic Vector Geometry
  const isAir = product.id.includes('air');
  const isPro = product.id.includes('pro');

  return (
    <div className={`${dimensions} flex items-center justify-center relative select-none group`}>
      {/* Ambient Radial Underglow matching device color */}
      <div
        className="absolute inset-4 rounded-full blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-50"
        style={{ backgroundColor: activeColor.accentHex }}
      />

      {/* Main iPhone Body Container */}
      <div
        className={`relative transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1.5 ${
          view === 'angled' ? 'rotate-[-4deg] group-hover:rotate-0' : ''
        }`}
        style={{
          width: isAir ? '148px' : '158px',
          height: '316px',
        }}
      >
        {/* Soft Drop Shadow under chassis */}
        <div className="absolute -bottom-4 left-3 right-3 h-6 bg-black/50 blur-lg rounded-full" />

        {/* Outer Titanium / Metallic Chassis Frame */}
        <div
          className="relative w-full h-full rounded-[40px] p-[2.5px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          style={{
            background: `linear-gradient(145deg, ${activeColor.accentHex}ee, ${activeColor.hex}99, ${activeColor.accentHex}dd)`,
            border: `1px solid ${activeColor.accentHex}44`,
          }}
        >
          {/* Outer Frame Bevel Highlights */}
          <div className="absolute inset-0 rounded-[40px] ring-1 ring-white/20 pointer-events-none" />

          {/* Side Buttons Visuals */}
          <span
            className="absolute -left-[3.5px] top-16 w-[3px] h-4 rounded-l-sm"
            style={{ backgroundColor: activeColor.accentHex }}
          />
          <span
            className="absolute -left-[3.5px] top-24 w-[3px] h-7 rounded-l-sm"
            style={{ backgroundColor: activeColor.accentHex }}
          />
          <span
            className="absolute -left-[3.5px] top-33 w-[3px] h-7 rounded-l-sm"
            style={{ backgroundColor: activeColor.accentHex }}
          />
          <span
            className="absolute -right-[3.5px] top-26 w-[3px] h-12 rounded-r-sm"
            style={{ backgroundColor: activeColor.accentHex }}
          />

          {/* FRONT VIEW or BACK VIEW */}
          {view === 'back' ? (
            /* REAR GLASS PANEL VIEW */
            <div
              className="relative w-full h-full rounded-[38px] p-3 flex flex-col justify-between overflow-hidden shadow-inner"
              style={{ backgroundColor: activeColor.hex }}
            >
              {/* Frosted Glass Matte Texture & Highlights */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

              {/* Camera Plateau Block */}
              <div
                className={`relative rounded-[24px] p-2 shadow-2xl border border-white/20 ${
                  isPro ? 'w-20 h-20' : 'w-16 h-18'
                }`}
                style={{
                  backgroundColor: `${activeColor.hex}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Lenses */}
                <div className="relative w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    {/* Top Lens */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-black p-0.5 border border-zinc-600 shadow-md flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-black border border-blue-900/60 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-950" />
                      </div>
                    </div>
                    {/* Flash */}
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-100 shadow-[0_0_6px_#fef3c7] border border-amber-200" />
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Bottom-left Lens */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-black p-0.5 border border-zinc-600 shadow-md flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-black border border-blue-900/60 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-950" />
                      </div>
                    </div>
                    {/* Telephoto or LiDAR */}
                    {isPro ? (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-black p-0.5 border border-zinc-600 shadow-md flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-black border border-blue-900/60 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-indigo-950" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
                    )}
                  </div>
                </div>
              </div>

              {/* Apple Logo Centered */}
              <div className="self-center my-auto opacity-75">
                <svg className="w-8 h-8 fill-white/80 drop-shadow-md" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.83-8.03-12.43-14.97-6.3-9.5-11.19-20.19-14.67-32.07-3.48-11.88-5.22-23.01-5.22-33.39 0-14.37 3.59-26.04 10.77-35.01 7.18-8.97 16.2-13.55 27.06-13.74 5.34 0 11.2 1.34 17.58 4.02 6.38 2.68 10.43 4.06 12.16 4.14 1.35 0 5.48-1.42 12.39-4.26 6.91-2.84 12.63-4.14 17.16-3.9 12.61.68 22.42 5.39 29.43 14.13-11.03 6.69-16.42 16.03-16.16 28.02.25 9.4 3.86 17.21 10.83 23.43 4.29 3.83 9.38 6.45 15.28 7.86-2.18 6.49-4.87 13.06-8.08 19.72zM119.22 33.64c0-7.39 2.62-14.42 7.86-21.09 5.24-6.67 11.89-10.92 19.95-12.75.12 1.09.18 2.06.18 2.92 0 7.39-2.77 14.54-8.31 21.45-5.54 6.91-12.08 11.05-19.62 12.43-.06-.85-.06-1.84-.06-2.96z" />
                </svg>
              </div>

              <div className="h-4" />
            </div>
          ) : (
            /* FRONT OLED SCREEN VIEW */
            <div className="relative w-full h-full rounded-[38px] bg-black p-1.5 flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Dynamic Island Pill at Top */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-16 h-4 bg-black rounded-full border border-zinc-900 flex items-center justify-between px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-blue-950/80" />
              </div>

              {/* Glowing OLED Wallpaper Display */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-gradient-to-b from-[#0f091c] via-[#1a0e2e] to-[#080a14] p-3 flex flex-col justify-between">
                {/* Wave lighting graphics */}
                <div
                  className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-2xl opacity-60"
                  style={{ backgroundColor: activeColor.accentHex }}
                />
                <div className="absolute bottom-10 right-0 w-36 h-36 rounded-full bg-blue-600/20 blur-xl" />

                {/* Clock Header */}
                <div className="pt-8 text-center relative z-10">
                  <div className="text-[10px] text-zinc-400 font-medium">Saturday, Oct 10</div>
                  <div className="text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">
                    09:41
                  </div>
                </div>

                {/* Center Futuristic Brand Motif */}
                <div className="my-auto text-center relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                    <span className="font-display font-extrabold text-xs text-white tracking-widest">iS</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-purple-300/80 font-semibold uppercase">
                    {product.name}
                  </span>
                </div>

                {/* Bottom Home Indicator */}
                <div className="relative z-10 flex justify-center pb-1">
                  <div className="w-24 h-1 rounded-full bg-white/80" />
                </div>
              </div>

              {/* Glossy Glass Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none rounded-[36px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
