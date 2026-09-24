/* Fundación Un Lugar — "la mancha viva" (iteration 3, 2026-09-24; DECISIONS.md 2026-09-24, item 4)

   A slowly moving 3D paint blob in brand blue behind the hero photo: one small
   WebGL fragment shader that raymarches a soft signed-distance blob with a few
   loose droplets (the logo's paint splash, in three dimensions). No library.

   Progressive enhancement, decorative only:
   - The SVG splash in index.html stays visible until the first WebGL frame has
     rendered, and comes back if anything fails (no WebGL, shader error, lost context).
   - Skipped entirely for prefers-reduced-motion, Save-Data, and software-only
     WebGL (failIfMajorPerformanceCaveat), so low-end phones keep the flat splash.
   - Starts only after the page has loaded and the browser is idle; the hero photo
     (the LCP element) never waits for it.
   - The canvas is aria-hidden, never holds content, ignores the pointer, pauses when
     off-screen or in a hidden tab, lowers its resolution (then freezes) on slow devices.
   - It sits behind the photograph and never draws on or distorts a photo of a child.

   Verification hooks (used by site/_screenshots/_tools/): ?no3d forces the fallback;
   ?force3d allows software WebGL so headless Chrome (SwiftShader) can render it.
   The state is exposed as data-splash3d on .hero__visual. */
(function () {
  'use strict';

  var visual = document.querySelector('.hero__visual');
  if (!visual) return;

  function setState(state) { visual.setAttribute('data-splash3d', state); }

  var query = window.location.search;
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (/[?&]no3d(=|&|$)/.test(query)) { setState('fallback:forced'); return; }
  if (reduceMotion && reduceMotion.matches) { setState('fallback:reduced-motion'); return; }
  if (connection && connection.saveData) { setState('fallback:save-data'); return; }
  if (!window.WebGLRenderingContext) { setState('fallback:no-webgl'); return; }
  var allowSoftware = /[?&]force3d(=|&|$)/.test(query);

  var VERT = 'attribute vec2 aPos;\nvoid main() { gl_Position = vec4(aPos, 0.0, 1.0); }';

  var FRAG = [
    'precision highp float;',
    'uniform vec2 uRes;',
    'uniform float uTime;',
    'uniform vec2 uTilt;',
    '',
    'mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }',
    '',
    'float smin(float a, float b, float k) {',
    '  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);',
    '  return mix(b, a, h) - k * h * (1.0 - h);',
    '}',
    '',
    // The blob: a squashed, slowly wobbling drop with three lobes (the irregular
    // outline of the logo splash), one drop that stretches away and back, and three
    // loose droplets like the ones around the SVG splash.
    'float map(vec3 p) {',
    '  float t = uTime;',
    '  p.xz = rot(uTilt.x + 0.28 * sin(t * 0.21)) * p.xz;',
    '  p.yz = rot(uTilt.y + 0.16 * sin(t * 0.17 + 1.3)) * p.yz;',
    '  p.xy = rot(0.1 * sin(t * 0.13)) * p.xy;',
    '  float wobble = 0.075 * sin(2.2 * p.x + t * 0.9) * sin(2.0 * p.y + t * 0.7) * sin(1.8 * p.z + t * 1.1);',
    '  float d = (length(p * vec3(0.94, 1.0, 1.25)) - 1.0) * 0.8 + wobble;',
    '  d = smin(d, length(p - vec3(0.62 + 0.06 * sin(t * 0.5), 0.58, 0.0)) - 0.5, 0.42);',
    '  d = smin(d, length(p - vec3(-0.66, -0.52 + 0.06 * sin(t * 0.4), 0.08)) - 0.44, 0.42);',
    '  d = smin(d, length(p - vec3(-0.34, 0.78, -0.1)) - 0.32, 0.38);',
    '  vec3 c1 = vec3(1.02 + 0.24 * sin(t * 0.55), -0.6 - 0.12 * sin(t * 0.55), 0.1);',
    '  d = smin(d, length(p - c1) - 0.2, 0.32);',
    '  d = min(d, length(p - vec3(1.36, 1.16 + 0.05 * sin(t * 0.9), 0.05)) - 0.13);',
    '  d = min(d, length(p - vec3(1.6, 0.84, -0.1)) - 0.065);',
    '  d = min(d, length(p - vec3(-1.02, 1.3 + 0.05 * sin(t * 0.7), 0.1)) - 0.1);',
    '  return d;',
    '}',
    '',
    'vec3 normalAt(vec3 p) {',
    '  const vec2 k = vec2(1.0, -1.0);',
    '  const float e = 0.0015;',
    '  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) +',
    '                   k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));',
    '}',
    '',
    // Lighting in linear light: brand blue #1F64BF as the body colour, a key light
    // from above (the part that shows above the photo), a soft fill, a sky-blue rim and a glossy paint highlight.
    'vec3 shade(vec3 n, vec3 rd) {',
    '  vec3 blue = vec3(0.0137, 0.1274, 0.5210);',
    '  vec3 l1 = normalize(vec3(0.3, 0.85, 0.55));',
    '  vec3 l2 = normalize(vec3(-0.6, -0.4, 0.5));',
    '  float wrap = max((dot(n, l1) + 0.4) / 1.4, 0.0);',
    '  float fill = max(dot(n, l2), 0.0);',
    '  float spec = pow(max(dot(n, normalize(l1 - rd)), 0.0), 72.0);',
    '  float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);',
    '  vec3 col = blue * (0.28 + 0.95 * wrap) + blue * 0.35 * fill;',
    '  col += vec3(0.35, 0.55, 0.95) * fres * 0.45;',
    '  col += vec3(1.0, 0.97, 0.92) * spec * 1.1;',
    '  return col;',
    '}',
    '',
    'void main() {',
    '  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);',
    '  vec3 ro = vec3(0.0, 0.0, 6.0);',
    '  vec3 rd = normalize(vec3(uv, -1.62));',
    '  float b = dot(ro, rd);',
    '  float disc = b * b - (dot(ro, ro) - 4.0);',    // bounding sphere, radius 2
    '  if (disc < 0.0) { gl_FragColor = vec4(0.0); return; }',
    '  float sq = sqrt(disc);',
    '  float t = max(-b - sq, 0.0);',
    '  float tEnd = -b + sq;',
    '  float dMin = 1e5;',
    '  float tMin = t;',
    '  bool hit = false;',
    '  for (int i = 0; i < 72; i++) {',
    '    float d = map(ro + rd * t);',
    '    if (d < dMin) { dMin = d; tMin = t; }',
    '    if (d < 0.0015) { hit = true; break; }',
    '    t += d * 0.8;',
    '    if (t > tEnd) break;',
    '  }',
    '  float px = 3.7 / min(uRes.x, uRes.y);',        // world size of one pixel near the blob
    '  float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, 1.5 * px, dMin);',
    '  if (alpha <= 0.0) { gl_FragColor = vec4(0.0); return; }',
    '  vec3 p = ro + rd * (hit ? t : tMin);',
    '  vec3 col = shade(normalAt(p), rd);',
    '  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));',
    '  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;',  // dither against banding
    '  gl_FragColor = vec4(col * alpha, alpha);',
    '}'
  ].join('\n');

  function whenIdle(fn) {
    if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: 2000 });
    else window.setTimeout(fn, 300);
  }

  function start() {
    var canvas = document.createElement('canvas');
    canvas.className = 'splash-3d';
    canvas.setAttribute('aria-hidden', 'true');
    visual.insertBefore(canvas, visual.firstChild);

    var gl = null;
    var options = {
      alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false,
      preserveDrawingBuffer: false, powerPreference: 'low-power', failIfMajorPerformanceCaveat: !allowSoftware
    };
    try { gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options); } catch (e) { gl = null; }
    if (!gl) return teardown('fallback:no-webgl');

    var high = gl.getShaderPrecisionFormat && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
    if (high && high.precision === 0) return teardown('fallback:no-highp');

    function compile(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    }
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return teardown('fallback:shader');
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return teardown('fallback:shader');
    gl.useProgram(program);

    var buffer = gl.createBuffer();   // one triangle that covers the whole canvas
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    var uRes = gl.getUniformLocation(program, 'uRes');
    var uTime = gl.getUniformLocation(program, 'uTime');
    var uTilt = gl.getUniformLocation(program, 'uTilt');

    // Resolution: device pixel ratio capped at 2, rendered a little below it (the blob is soft).
    var wide = window.matchMedia && window.matchMedia('(min-width: 64em)').matches;
    var scale = wide ? 0.85 : 0.7;
    var running = false, frozen = false, shown = false, onScreen = true;
    var rafId = 0, last = 0, time = 3.0, frames = 0, slow = 0;
    var tilt = { x: 0, y: 0 }, target = { x: 0, y: 0 };

    function pixelRatio() { return Math.min(Math.max(Math.min(window.devicePixelRatio || 1, 2) * scale, 1), 2); }

    function resize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      var r = pixelRatio();
      var W = Math.round(w * r), H = Math.round(h * r);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W; canvas.height = H;
        if (!running) draw();
      }
    }

    function draw() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uTilt, tilt.x, tilt.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function frame(now) {
      rafId = 0;
      if (!running) return;
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      time += dt;
      var ease = Math.min(1, dt * 2.5);
      tilt.x += (target.x - tilt.x) * ease;
      tilt.y += (target.y - tilt.y) * ease;
      draw();
      if (!shown) {
        if (gl.getError() !== gl.NO_ERROR) return teardown('fallback:draw');
        shown = true;
        visual.classList.add('has-splash3d');
        setState('running');
      }
      // Slow device: after a warm-up, lower the resolution once, then keep a still frame.
      frames++;
      if (frames > 30) slow = dt > 0.034 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 40) {
        slow = 0;
        if (scale > 0.5) { scale *= 0.65; resize(); }
        else { freeze(); return; }
      }
      rafId = window.requestAnimationFrame(frame);
    }

    function update() {
      var go = onScreen && !document.hidden && !frozen;
      if (go && !running) { running = true; last = 0; rafId = window.requestAnimationFrame(frame); }
      else if (!go && running) { running = false; if (rafId) window.cancelAnimationFrame(rafId); rafId = 0; }
    }

    function freeze() {
      frozen = true; running = false;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = 0;
      setState('frozen');
    }

    function onPointer(event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      var box = canvas.getBoundingClientRect();
      var nx = (event.clientX - (box.left + box.width / 2)) / window.innerWidth * 2;
      var ny = (event.clientY - (box.top + box.height / 2)) / window.innerHeight * 2;
      target.x = Math.max(-1, Math.min(1, nx)) * 0.45;
      target.y = Math.max(-1, Math.min(1, ny)) * 0.3;
    }

    var observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; update(); }, { rootMargin: '80px' });
      observer.observe(canvas);
    }
    var resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(canvas); else window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', update);
    canvas.addEventListener('webglcontextlost', function (event) { event.preventDefault(); teardown('fallback:context-lost'); });
    if (reduceMotion) {
      var onMotionChange = function (event) { if (event.matches) teardown('fallback:reduced-motion'); };
      if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', onMotionChange);
      else if (reduceMotion.addListener) reduceMotion.addListener(onMotionChange);
    }

    resize();
    update();

    // Hoisted, so the early failure paths above can use it before the loop exists.
    function teardown(state) {
      running = false; frozen = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = 0;
      if (observer) observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', update);
      visual.classList.remove('has-splash3d');
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      setState(state);
    }
  }

  setState('waiting');
  function begin() { whenIdle(start); }
  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin);
})();
