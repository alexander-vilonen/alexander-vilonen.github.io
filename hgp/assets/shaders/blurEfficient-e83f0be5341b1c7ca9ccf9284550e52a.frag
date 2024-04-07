#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif
varying LOWP vec4 vColor;
varying vec2 vTexCoord;

uniform sampler2D u_texture;
uniform vec2 resolution;
uniform vec2 dir;
uniform int kernelSize;
//uniform float weight[5] = float[] (0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
//uniform float weight[16] = float[16] (0.24197072, 0.21187665, 0.18264909, 0.15501226, 0.1295176, 0.106538266, 0.08627732, 0.06878628, 0.053990968, 0.041720986, 0.031739652, 0.0237719, 0.017528301, 0.012724182, 0.009093562, 0.0063981204);
uniform float weight[10];

void main() {

    vec2 tex_offset = vec2(1.0, 1.0) / resolution; // gets size of single texel
    vec4 current = texture2D(u_texture, vTexCoord);
    vec3 result = current.rgb * weight[0]; // current fragment's contribution


    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(1), dir.y * tex_offset.y * float(1))).rgb * weight[1];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(1), dir.y * tex_offset.y * float(1))).rgb * weight[1];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(2), dir.y * tex_offset.y * float(2))).rgb * weight[2];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(2), dir.y * tex_offset.y * float(2))).rgb * weight[2];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(3), dir.y * tex_offset.y * float(3))).rgb * weight[3];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(3), dir.y * tex_offset.y * float(3))).rgb * weight[3];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(4), dir.y * tex_offset.y * float(4))).rgb * weight[4];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(4), dir.y * tex_offset.y * float(4))).rgb * weight[4];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(5), dir.y * tex_offset.y * float(5))).rgb * weight[5];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(5), dir.y * tex_offset.y * float(5))).rgb * weight[5];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(6), dir.y * tex_offset.y * float(6))).rgb * weight[6];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(6), dir.y * tex_offset.y * float(6))).rgb * weight[6];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(7), dir.y * tex_offset.y * float(7))).rgb * weight[7];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(7), dir.y * tex_offset.y * float(7))).rgb * weight[7];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(8), dir.y * tex_offset.y * float(8))).rgb * weight[8];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(8), dir.y * tex_offset.y * float(8))).rgb * weight[8];

    result += texture2D(u_texture, vTexCoord + vec2(dir.x * tex_offset.x * float(9), dir.y * tex_offset.y * float(9))).rgb * weight[9];
    result += texture2D(u_texture, vTexCoord - vec2(dir.x * tex_offset.x * float(9), dir.y * tex_offset.y * float(9))).rgb * weight[9];



    gl_FragColor = vec4(result, current.a);
}
