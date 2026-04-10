//color of blob

varying vec3 vNormal; //recieving direction of vertices from vertex shader 

void main() {
    //where is the light in clip space
    vec3 lightPos = vec3(2, 2, 0);//x,y,z values
    
    //how much light is hitting the surface
    float lightAmount = dot (x: lightPos, y: normalize(v_normal)); //dot product adds a light to the obj (only this obj will be impacted because in the shader)

    gl_FragColor = vec4(vec3(lightAmount), 1.0); //vec 4 because rgba four values, defines color of each fragment
}

//vec3 lightDir = normalize(vec3(2.0, 2.0, 0.0));
// float lightAmount = max(dot(v_normal, lightDir), 0.0);

  