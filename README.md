# Hayabusa FX

テクニカル指標にもとづいて為替の売買シグナル(買い / 売り / 様子見)を表示する、Expo (React Native) 製のモバイルアプリです。

## 主な機能

- 主要通貨ペア(USD/JPY, EUR/USD, GBP/JPY, EUR/JPY, GBP/USD, AUD/USD)のウォッチリスト
- 各ペアの詳細画面で、価格チャート(30日 / 90日 / 180日)とシグナル根拠を表示
- SMA(短期5日・長期20日)のクロス、RSI(14)の買われ過ぎ・売られ過ぎ、MACDヒストグラムを組み合わせたルールベースの売買シグナル
- Pull to refresh でウォッチリストを再取得

## データソース

[Frankfurter](https://frankfurter.dev/)(ECB公表の為替レートを提供する無料API、APIキー不要)から日次レートを取得しています。

## 技術スタック

- Expo (SDK 57) / React Native / TypeScript
- React Navigation (Native Stack)
- react-native-svg によるシンプルな自前チャート描画

## セットアップ

```bash
npm install
npx expo start
```

Expo Go アプリ(iOS / Android)で表示された QR コードを読み取るか、iOS シミュレータ / Android エミュレータで起動してください。

## 免責事項

本アプリが表示する売買シグナルはテクニカル指標にもとづく参考情報であり、投資助言ではありません。実際の売買判断はご自身の責任で行ってください。
