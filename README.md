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

## Google Calendar連携のテスト

- Google Calendar APIを有効化する
- OAuth2 同意画面の作成
  - テストじゃないとドメインの証明とか割と面倒なので、一旦テストでやる
  - スコープに `https://www.googleapis.com/auth/admin.directory.resource.calendar` を追加
  - テストユーザーにテストで利用するアカウントを追加
- OAuth2 クライアントの作成
  - 承認済みのリダイレクト URIに `http://localhost:3000/google/calendar` を設定
    - クライアント側で渡す値と一致しないとおこられる
  - 生成されたクライアントID・シークレットを `.env` に格納する
    - `GCP_OAUTH_CLIENT_ID=...`, `GCP_OAUTH_CLIENT_SECRET=...`
