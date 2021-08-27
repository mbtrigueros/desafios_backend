export class Suma {
    private a: number = 0;
    private b: number = 0;

    constructor( a: number, b: number){
        this.a = a;
        this.b = b;
    }

    resultado(){
        return this.a + this.b;
    }

}