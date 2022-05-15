## これは

NextAuth x Cognitoのテスト用リポジトリ

## 使い方
### Cognitoのセットアップ

1. User Poolの作成
  - SMSは別途金がかかるのでemailのみのサインアップで。
  - 作成したUser PoolのIDを控えておく (`${REGION}_${randomstring}`の形式)
2. アプリケーションの統合
  - ドメインを紐づけないと利用できない
    - 適用な名前でドメインを切ってあげる。`https://hogehogefugafuga.xxx.xxx...`みたいなやつで十分
3. アプリケーションクライアントから認証情報を取得する
  - Client ID / Client Secret をそれぞれ登録したアプリケーションクライアントから取得する
  

### .envの作成
.envファイルを作成してCognitoの以下の情報を入力する

```ini
COGNITO_CLIENT_ID=$CognitoのアプリケーションクライアントのClient ID
COGNITO_CLIENT_SECRET=$CognitoのアプリケーションクライアントのClient Secret
COGNITO_ISSUER=https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}
NEXTAUTH_URL=http://localhost:3000
```
### アプリの起動
```
npm ci && npm run dev
```