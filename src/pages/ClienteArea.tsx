
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, CreditCard, Check, AlertCircle, Search, Plus, Minus, ShoppingCart, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ClienteArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cardSaved, setCardSaved] = useState(false);
  const [nomeAbreviado, setNomeAbreviado] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  
  const handleConsultar = () => {
    if (matricula.trim() === "") {
      toast({
        title: "Erro",
        description: "Por favor insira sua matrícula",
        variant: "destructive",
      });
      return;
    }
    
    // Aceitar qualquer matrícula
    toast({
      title: "Matrícula válida",
      description: "Sua matrícula foi validada com sucesso",
      variant: "default",
    });
    
    setLoggedIn(true);
  };
  
  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      
      // Create URL for preview
      const url = URL.createObjectURL(file);
      setFotoUrl(url);
    }
  };
  
  const handleSaveCard = () => {
    if (!nomeAbreviado.trim()) {
      toast({
        title: "Erro",
        description: "Por favor preencha o Nome Abreviado",
        variant: "destructive",
      });
      return;
    }

    if (!nomeCompleto.trim()) {
      toast({
        title: "Erro",
        description: "Por favor preencha o Nome Completo",
        variant: "destructive",
      });
      return;
    }

    if (!foto) {
      toast({
        title: "Erro",
        description: "Por favor adicione uma foto",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Dados do cartão salvos com sucesso",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
    setCardSaved(true);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const valorUnitario = 66.40;
  const valorTotal = valorUnitario * quantity;
  
  const handleFinalizarCompra = () => {
    if (!cardSaved) {
      toast({
        title: "Atenção",
        description: "Por favor salve os dados do cartão antes de prosseguir",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Compra finalizada!",
      description: "Você receberá um e-mail e WhatsApp com a confirmação",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  
  const handleFormClick = () => {
    if (!cardSaved) {
      toast({
        title: "Atenção",
        description: "Por favor salve os dados do cartão antes de prosseguir",
        variant: "destructive",
      });
    }
  };
  
  // Renderiza o formulário de login se não estiver logado
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            {/* Logo superior */}
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-16 mb-8"
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-full">Matrícula Light</h2>
            
            <div className="w-full mb-4">
              <Input 
                placeholder="Digite sua matrícula" 
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full h-12 text-base"
              />
            </div>
            
            <Button 
              onClick={handleConsultar} 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 mb-6"
            >
              <Search className="h-5 w-5" />
              Consultar Matrícula
            </Button>
            
            <div className="bg-gray-100 p-4 rounded-md text-gray-700 text-sm mb-8 w-full">
              <p>
                Sistema de solicitação de 2ª via do Kit de Identificação Pessoal Light. Preencha corretamente o número da sua matrícula, e o sistema gerará o seu último crachá com o mesmo modelo atualizado.
              </p>
            </div>
            
            {/* Logo inferior */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
              alt="Light" 
              className="h-12"
            />
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-amber-50 p-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-4 md:p-6 flex flex-col items-center">
            {/* Logo superior */}
            <img 
              src="https://areadocliente.alternativacard.com/up/uploads/alt-67d9cda455e18.png" 
              alt="CrachaShop" 
              className="h-12 md:h-16 mb-6 md:mb-8"
            />
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados do Cartão</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Coluna da esquerda - Pré-visualização do cartão */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-800 rounded-lg p-6 w-full h-72 relative flex flex-col justify-between">
                  <div className="absolute right-2 top-2">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
                      alt="Light Logo" 
                      className="w-20 h-auto bg-white p-1 rounded"
                    />
                  </div>

                  <div className="mt-16 flex items-center justify-center">
                    {fotoUrl ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                        <img src={fotoUrl} alt="Foto do funcionário" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                        <CreditCard className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                  </div>

                  <div className="text-white text-center mt-2">
                    <div className="text-lg font-bold">{nomeAbreviado || "NOME ABREVIADO"}</div>
                    <div className="text-sm mt-1">{matricula || "MATRÍCULA"}</div>
                    <div className="text-xs mt-1">LIGHT</div>
                  </div>
                </div>
              </div>

              {/* Coluna da direita - Formulário de dados do cartão */}
              <div className="md:col-span-2">
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label>Nome Abreviado</Label>
                    <Input 
                      placeholder="Digite seu nome abreviado" 
                      value={nomeAbreviado} 
                      onChange={(e) => setNomeAbreviado(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input 
                      placeholder="Digite seu nome completo" 
                      value={nomeCompleto} 
                      onChange={(e) => setNomeCompleto(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Matrícula</Label>
                    <Input value={matricula} readOnly />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Foto</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Label htmlFor="foto-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Clique para selecionar</span>
                        </div>
                        <Input
                          id="foto-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadFoto}
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSaveCard} 
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Salvar Cartão
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white shadow-md rounded-lg overflow-hidden" onClick={!cardSaved ? handleFormClick : undefined}>
          <div className={`p-4 md:p-6 flex flex-col items-center ${!cardSaved ? 'opacity-70 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Dados Pessoais</h2>
            
            <div className="w-full space-y-4 mb-6">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input placeholder="Digite seu nome completo" defaultValue={nomeCompleto} />
              </div>
              
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input placeholder="000.000.000-00" />
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="seu@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input placeholder="(00) 00000-0000" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center w-full">Finalização</h2>
            
            <div className="w-full space-y-4 mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e3f6bd0fe.png" 
                  alt="Crachá PVC" 
                  className="w-16 h-16 object-contain rounded-md"
                />
                <div className="font-medium">Crachá PVC</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <img 
                  src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e2f02ac11.png" 
                  alt="Cordão" 
                  className="w-16 h-16 object-contain rounded-md"
                />
                <div className="font-medium">CORDÃO</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <img 
                  src="https://areadocliente.alternativacard.com/up/uploads/alt-67d2e3f6bd0fe.png" 
                  alt="Porta Crachá" 
                  className="w-16 h-16 object-contain rounded-md"
                />
                <div className="font-medium">PORTA CRACHÁ</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-blue-800">Total:</span>
                  <span className="font-bold text-lg text-blue-800">R$ {valorTotal.toFixed(2)}</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Quantidade:</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={decreaseQuantity}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-4 font-medium">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={increaseQuantity}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <strong>Informações de entrega:</strong><br />
                A entrega será realizada em até 10 dias úteis após a confirmação do pagamento. Para mais informações, entre em contato pelo e-mail ou telefone.
              </div>
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12" 
                onClick={handleFinalizarCompra}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Finalizar Pedido
              </Button>
            </div>
            
            {/* Logo inferior */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Light_Servi%C3%A7os_Eletricidade.svg/1200px-Light_Servi%C3%A7os_Eletricidade.svg.png" 
              alt="Light" 
              className="h-12 mt-4"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClienteArea;
