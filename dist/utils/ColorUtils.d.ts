/**
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * all credits to
 * https://stackoverflow.com/users/740553/mike-pomax-kamermans
 */
declare abstract class ColorUtils {
    static pSBC(p: number, c0: string, c1?: any, l?: any): string | null;
    private static pSBCr;
}
export { ColorUtils };
