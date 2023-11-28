import {AParticleSystemModel} from "./AParticleSystemModel";
import {AObject, ASerializable} from "../../base";
import {AParticle} from "../../physics";
import {ANodeModel2D, ANodeModel3D, ANodeTransformModel2D} from "../../scene";
import {ParticleEvents} from "../../physics/particles/AParticleEnums";
import {ParticleSystemModelInterface} from "./ParticleSystemModelInterface";


@ASerializable("A2DParticleSystemModel")
export class A2DParticleSystemModel<P extends AParticle<any>> extends ANodeTransformModel2D implements ParticleSystemModelInterface<P>{
    particles:P[]=[];
    get nParticles(){
        return this.particles.length;
    }

    /**
     *
     * @param callback
     * @param handle
     * @param synchronous
     * @returns {AStateCallbackSwitch}
     */
    addParticlesListener(callback:(self:AObject)=>void, handle?:string, synchronous:boolean=true,){
        return this.addEventListener(ParticleEvents.PARTICLES_UPDATED,callback, handle);
    }

    signalParticlesUpdated(...args:any[]){
        this.signalEvent(ParticleEvents.PARTICLES_UPDATED, ...args);
    }


    addParticle(particle:P){
        this.particles.push(particle);
    }

}