from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# Simulação de banco de dados fake para check-ins e usuários
db_fake = {
    'sessions': {},
    'users': {}
}

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if 'usuario' not in data or 'email' not in data or 'setor' not in data or 'polo' not in data:
        return jsonify({'erro': 'Os campos "usuario", "email", "setor" e "polo" são obrigatórios'}), 400
    
    usuario = data['usuario']
    email = data['email']
    setor = data['setor']
    polo = data['polo']
    
    # Armazene as informações do usuário no dicionário de usuários
    db_fake['users'][usuario] = {'email': email, 'setor': setor, 'polo': polo, 'total_horas': 0.0}
    
    return jsonify({'mensagem': f'Usuário {usuario} criado com sucesso'})


@app.route('/create_session', methods=['POST'])
def create_session():
    data = request.get_json()
    
    if 'nome' not in data:
        return jsonify({'erro': 'O campo "nome" é obrigatório'}), 400
    
    nome_usuario = data['nome']
    
    # Verifique se já existe uma sessão aberta para o usuário
    sessao_aberta = None
    for sessao_id, sessao_data in db_fake['sessions'].items():
        if sessao_data['usuario'] == nome_usuario and sessao_data['checkout'] is None:
            sessao_aberta = sessao_id
            break
    
    if not sessao_aberta:
        sessao_id = len(db_fake['sessions']) + 1
        total_horas = 0.0
        db_fake['sessions'][sessao_id] = {'usuario': nome_usuario, 'checkin': None, 'checkout': None, 'total_horas': total_horas}
    
    return jsonify({'id_session': sessao_id})


@app.route('/checkin', methods=['POST'])
def checkin():
    data = request.get_json()
    
    if 'sessao_id' not in data:
        return jsonify({'erro': 'O campo "sessao_id" é obrigatório'}), 400
    
    sessao_id = data['sessao_id']
    
    # Verifique se a sessão existe
    if sessao_id not in db_fake['sessions']:
        return jsonify({'erro': 'Sessão não encontrada'}), 404
    
    # Registre o check-in com a hora atual no banco de dados fake
    hora_checkin = datetime.datetime.now()
    db_fake['sessions'][sessao_id]['checkin'] = hora_checkin
    
    return jsonify({'mensagem': f'Check-in registrado com sucesso para a sessão {sessao_id}', 'hora_checkin': hora_checkin.strftime('%Y-%m-%d %H:%M:%S')})


@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    
    if 'sessao_id' not in data:
        return jsonify({'erro': 'O campo "sessao_id" é obrigatório'}), 400
    
    sessao_id = data['sessao_id']
    
    # Verifique se a sessão existe
    if sessao_id not in db_fake['sessions']:
        return jsonify({'erro': 'Sessão não encontrada'}), 404
    
    # Registre o check-out com a hora atual no banco de dados fake
    hora_checkout = datetime.datetime.now()
    
    # Calcule a diferença de tempo entre check-in e check-out
    hora_checkin = db_fake['sessions'][sessao_id]['checkin']
    if hora_checkin is None:
        return jsonify({'erro': 'Check-in não foi registrado para esta sessão'}), 400
    
    db_fake['sessions'][sessao_id]['checkout'] = hora_checkout
    
    diferenca_tempo = hora_checkout - hora_checkin
    total_horas = diferenca_tempo.total_seconds() / 3600  # Converte para horas
    db_fake['sessions'][sessao_id]['total_horas'] = total_horas
    
    return jsonify({'mensagem': f'Check-out registrado com sucesso para a sessão {sessao_id}', 'hora_checkout': hora_checkout.strftime('%Y-%m-%d %H:%M:%S'), 'total_horas': total_horas})


@app.route('/user_points/<user_name>', methods=['GET'])
def user_points(user_name):
    if user_name not in db_fake['users']:
        return jsonify({'erro': 'Usuário não encontrado'}), 404
    
    total_horas = 0.0
    
    for sessao_id, sessao_data in db_fake['sessions'].items():
        if sessao_data['usuario'] == user_name and 'total_horas' in sessao_data:
            total_horas += sessao_data['total_horas']
    
    total_pontos = int(total_horas * 60)
    
    return jsonify({'pontos': total_pontos})


@app.route('/user_work_hours/<user_name>', methods=['GET'])
def user_work_hours(user_name):
    if user_name not in db_fake['users']:
        return jsonify({'erro': 'Usuário não encontrado'}), 404
    
    total_horas = 0.0
    
    for sessao_id, sessao_data in db_fake['sessions'].items():
        if sessao_data['usuario'] == user_name and 'total_horas' in sessao_data:
            total_horas += sessao_data['total_horas']
    
    horas_inteiras = int(total_horas)
    minutos = int((total_horas - horas_inteiras) * 60)
    
    total_horas_format = '{:02}:{:02}'.format(horas_inteiras, minutos)
    
    return jsonify({'horas_trabalhadas': total_horas_format})


if __name__ == '__main__':
    app.run(debug=True, port=9001)
