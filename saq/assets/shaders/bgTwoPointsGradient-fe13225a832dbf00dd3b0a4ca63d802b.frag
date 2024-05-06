#ifdef GL_ES
#define LOWP lowp
    precision mediump float;
#else
    #define LOWP
#endif

varying LOWP vec4 v_color;
varying vec2 v_texCoords;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform vec4 u_top_color;
uniform vec4 u_bottom_color;

const float offset_from_edge = 0.1;

uniform sampler2D u_blue_dither;

uniform float u_big;
uniform float u_small;

void main() {
    vec4 gradientColor = mix(u_top_color, u_bottom_color, v_texCoords.y);

    //Apply dither (same logic as the blueDither fragment)
    vec3 adj = texture2D(u_blue_dither, mod(gl_FragCoord.xy, 64.0) * (1.0 / 64.0)).rgb * u_big - u_small;
    gradientColor.rgb = clamp(gradientColor.rgb + adj, 0.0, 1.0);
    gl_FragColor = v_color * gradientColor;
}