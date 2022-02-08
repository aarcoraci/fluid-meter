/**
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * all credits to
 * https://stackoverflow.com/users/740553/mike-pomax-kamermans
 */

/**
 * sorry for the super messy ts conversion. Not a lot of time here :(
 */

// Version 4.0
type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

abstract class ColorUtils {
  public static pSBC(
    p: number,
    c0: string,
    c1: any = null,
    l: any = null
  ): string | null {
    let h: boolean;
    let r: number;
    let g: number;
    let b: number;
    let t: Color | number | null;
    let a: boolean | number = typeof c1 == 'string';
    let P: boolean | number;
    let f: Color | boolean | null;

    const m = Math.round;

    (h = c0.length > 9),
      (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
      (f = this.pSBCr(c0)),
      (P = p < 0),
      (t =
        c1 && c1 != 'c'
          ? this.pSBCr(c1)
          : P
          ? { r: 0, g: 0, b: 0, a: -1 }
          : { r: 255, g: 255, b: 255, a: -1 }),
      (p = P ? p * -1 : p),
      (P = 1 - p);
    if (!f || !t) return null;
    if (l)
      (r = m(P * f.r + p * t.r)),
        (g = m(P * f.g + p * t.g)),
        (b = m(P * f.b + p * t.b));
    else
      (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
        (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
        (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
    (a = f.a),
      (t = t.a),
      (f = a >= 0 || t >= 0),
      (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
    if (h)
      return (
        'rgb' +
        (f ? 'a(' : '(') +
        r +
        ',' +
        g +
        ',' +
        b +
        (f ? ',' + m(a * 1000) / 1000 : '') +
        ')'
      );
    else
      return (
        '#' +
        (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
          .toString(16)
          .slice(1, f ? undefined : -2)
      );
  }

  private static pSBCr(d: string): Color | null {
    let r, g, b, a;
    const i = parseInt;
    const m = Math.round;
    let n = d.length;
    const x: Color = {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };

    if (n > 9) {
      ([r, g, b, a] = d.split(',')), (n = d.length);
      if (n < 3 || n > 4) return null;
      (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
        (x.g = i(g)),
        (x.b = i(b)),
        (x.a = a ? parseFloat(a) : -1);
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6)
        d =
          '#' +
          d[1] +
          d[1] +
          d[2] +
          d[2] +
          d[3] +
          d[3] +
          (n > 4 ? d[4] + d[4] : '');

      const d1 = i(d.slice(1), 16);
      if (n == 9 || n == 5)
        (x.r = (d1 >> 24) & 255),
          (x.g = (d1 >> 16) & 255),
          (x.b = (d1 >> 8) & 255),
          (x.a = m((d1 & 255) / 0.255) / 1000);
      else
        (x.r = d1 >> 16), (x.g = (d1 >> 8) & 255), (x.b = d1 & 255), (x.a = -1);
    }
    return x;
  }
}

export { ColorUtils };
