import unittest
import json
from your_app import app, db_fake  # Substitua 'your_app' pelo nome do módulo da sua aplicação

class TestApp(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        db_fake['sessions'] = {}
        db_fake['users'] = {}

    def test_create_user(self):
        user_data = {
            'usuario': 'rafael',
            'email': 'teste@teste.com',
            'setor': 1,
            'polo': '1'
        }
        response = self.app.post('/create_user', json=user_data)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['mensagem'], 'Usuário rafael criado com sucesso')

    def test_create_session(self):
        session_data = {
            'nome': 'rafael'
        }
        response = self.app.post('/create_session', json=session_data)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('id_session', data)

    def test_checkin(self):
        session_data = {
            'nome': 'rafael'
        }
        response = self.app.post('/create_session', json=session_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['id_session']

        checkin_data = {
            'sessao_id': session_id
        }
        response = self.app.post('/checkin', json=checkin_data)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('hora_checkin', data)

    def test_checkout(self):
        session_data = {
            'nome': 'rafael'
        }
        response = self.app.post('/create_session', json=session_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['id_session']

        checkin_data = {
            'sessao_id': session_id
        }
        response = self.app.post('/checkin', json=checkin_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['sessao_id']

        checkout_data = {
            'sessao_id': session_id
        }
        response = self.app.post('/checkout', json=checkout_data)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('hora_checkout', data)
        self.assertIn('total_horas', data)

    def test_user_points(self):
        user_data = {
            'usuario': 'rafael',
            'email': 'teste@teste.com',
            'setor': 1,
            'polo': '1'
        }
        self.app.post('/create_user', json=user_data)

        session_data = {
            'nome': 'rafael'
        }
        response = self.app.post('/create_session', json=session_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['id_session']

        checkin_data = {
            'sessao_id': session_id
        }
        response = self.app.post('/checkin', json=checkin_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['sessao_id']

        checkout_data = {
            'sessao_id': session_id
        }
        self.app.post('/checkout', json=checkout_data)

        response = self.app.get('/user_points/rafael')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('pontos', data)

    def test_user_work_hours(self):
        user_data = {
            'usuario': 'rafael',
            'email': 'teste@teste.com',
            'setor': 1,
            'polo': '1'
        }
        self.app.post('/create_user', json=user_data)

        session_data = {
            'nome': 'rafael'
        }
        response = self.app.post('/create_session', json=session_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['id_session']

        checkin_data = {
            'sessao_id': session_id
        }
        response = self.app.post('/checkin', json=checkin_data)
        data = json.loads(response.data.decode('utf-8'))
        session_id = data['sessao_id']

        checkout_data = {
            'sessao_id': session_id
        }
        self.app.post('/checkout', json=checkout_data)

        response = self.app.get('/user_work_hours/rafael')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('horas_trabalhadas', data)

if __name__ == '__main__':
    unittest.main()
