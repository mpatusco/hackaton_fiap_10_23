import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { NivelPermissao } from "src/app/models/enum/NivelPermissao";
import { localStorageService } from "../localStorageService";
import { Token } from "src/app/models/Login";

@Directive({
    selector: "[exibirParaNiveis]",
})
export class ExibirParaNiveisDirective implements OnInit, OnChanges {
    usuario: Token;

   

    private _else: TemplateRef<any>;
    @Input()
    set exibirParaNiveisElse(value: TemplateRef<any>) {
        this._else = value;
    }

    constructor(
        private _localStorageService: localStorageService,
        private templateRef: TemplateRef<any>,
        private viewContainer?: ViewContainerRef,
    ) {
        this.usuario = _localStorageService.getToken();
    }

    ngOnInit(): void {
        this.exibir();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.exibir();
    }

    exibir(): void {
        this.usuario = this._localStorageService.getToken();

        this.viewContainer.clear();

        if (this.temPermissao) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }

        else if (this._else) {
            this.viewContainer.createEmbeddedView(this._else);
        }
    }

    get temPermissao(): boolean {
        if (!this.usuario) {
            return false;
        }

        //criar validacao falta so trazer o role com o token do usuario. 
        
        // const exibirParaNiveis = this._exibirParaNiveis.includes(
        //     this.usuario.NivelPermissao
        // );


        const exibirParaNiveis = false;

        if ( exibirParaNiveis  ) {
            return true;
        }

        return false;
    }
}
